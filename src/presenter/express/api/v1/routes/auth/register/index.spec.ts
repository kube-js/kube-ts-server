import dotenv from 'dotenv';
dotenv.config();
import faker from 'faker';
import { CONFLICT, CREATED } from 'http-status-codes';
import { TEXT_LENGTH } from '../../../../../../../constants';
import { STUDENT } from '../../../../../../../constants/roles';
import { API_V1, AUTH, REGISTER } from '../../../../../../../constants/routes';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import assertOnResponseAndStatus, {
  BaseAssertionOptions,
} from '../../../../../utils/tests/assertOnResponseAndStatus';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_DIFFERENT_VALID_PASSWORD,
  TEST_UTC_DATE,
  TEST_UUID,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

const emailSubject = 'subject';
const link = 'link';

jest.mock('uuid', () => ({
  v4: jest.fn(() => TEST_UUID),
}));

jest.mock('../../../../../../../utils/helpers/url/getVerifyEmailUrl', () =>
  jest.fn(() => link)
);

jest.mock('../../../../../../../utils/helpers/date/getUtcDate', () =>
  jest.fn(() => TEST_UTC_DATE)
);

jest.mock('../../../../../../../utils/helpers/auth/generateToken', () =>
  jest.fn(() => 'token')
);

const validRequiredFields = {
  email: TEST_VALID_EMAIL,
  password: TEST_VALID_PASSWORD,
  password_confirmation: TEST_VALID_PASSWORD,
};

const REGISTER_URL = `${API_V1}${AUTH}${REGISTER}`;

export const assertWithRequiredFieldAlreadyIncluded = ({
  request,
  fields,
  statusCode,
}: BaseAssertionOptions) =>
  assertOnResponseAndStatus({
    fields: {
      ...validRequiredFields,
      ...fields,
    },
    request,
    statusCode,
    url: REGISTER_URL,
  });

describe('@presenter/auth/register', () => {
  const { request, service, mailServer } = initTests({ useMailServer: true });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fails to register user without required fields', async () => {
    await assertOnResponseAndStatus({
      request,
      url: REGISTER_URL,
    });
  });

  it('fails to register user when email is missing out of required properties', async () => {
    await assertOnResponseAndStatus({
      fields: {
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
      },
      request,
      url: REGISTER_URL,
    });
  });

  it('fails to register user when password is missing out of required properties', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password_confirmation: TEST_VALID_PASSWORD,
      },
      request,
      url: REGISTER_URL,
    });
  });

  it('fails to register user when password_confirmation is missing out of required properties', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
      },
      request,
      url: REGISTER_URL,
    });
  });

  it('fails to register user when password and password_confirmation are not matching', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_DIFFERENT_VALID_PASSWORD,
      },
      request,
      url: REGISTER_URL,
    });
  });

  it('fails to register user when bio exceeds number of characters', async () => {
    await assertWithRequiredFieldAlreadyIncluded({
      fields: {
        bio: faker.random.alphaNumeric(TEXT_LENGTH + 1),
      },
      request,
    });
  });

  it('fails to register user when date_of_birth is not valid date', async () => {
    await assertWithRequiredFieldAlreadyIncluded({
      fields: { date_of_birth: 'invalid date' },
      request,
    });
  });

  it('fails to register user when first_name is invalid', async () => {
    await assertWithRequiredFieldAlreadyIncluded({
      fields: { first_name: 3222 },
      request,
    });
  });

  it('fails to register user when gender is invalid', async () => {
    await assertWithRequiredFieldAlreadyIncluded({
      fields: { gender: 'non-existing-gender' },
      request,
    });
  });

  it('fails to register user when last_name is invalid', async () => {
    await assertWithRequiredFieldAlreadyIncluded({
      fields: { last_name: 3232 },
      request,
    });
  });

  it('fails to register user when user with the email already exist', async () => {
    await usersFactory({
      overrides: {
        email: validRequiredFields.email,
      },
      service: service.users,
    });

    await assertWithRequiredFieldAlreadyIncluded({
      request,
      statusCode: CONFLICT,
    });
  });

  it('registers user returning back it visible fields and jwt token', async () => {
    jest.mock('../../../../../../../translator/factory.ts', () => () => ({
      verifyYourEmailHtml: jest.fn(() => link),
      verifyYourEmailSubject: () => emailSubject,
      verifyYourEmailText: jest.fn(() => link),
    }));

    const fields = {
      bio: 'short bio',
      date_of_birth: '1970-01-01',
      first_name: 'John',
      gender: 'male',
      last_name: 'Doe',
    };

    const { body: id } = await assertWithRequiredFieldAlreadyIncluded({
      fields,
      request,
      statusCode: CREATED,
    });

    expect(id.roles).toEqual([STUDENT]);


    const { item } = await service.users.getItem({
      id,
    });

    expect(item.verifiedAt).toBeUndefined();
    expect(item.verifyToken).toBe(TEST_UUID);

    const messages = mailServer.messages;

    expect(messages.length).toBe(1);

    const { textContent, subject, to, from, htmlContent } = messages[0];

    expect(from).toMatchSnapshot('from');
    expect(htmlContent).toMatchSnapshot('htmlContent');
    expect(textContent).toMatchSnapshot('textContent');
    expect(subject).toMatchSnapshot('subject');
    expect(to).toMatchSnapshot('to');
  });
  // tslint:disable-next-line:max-file-line-count
});
