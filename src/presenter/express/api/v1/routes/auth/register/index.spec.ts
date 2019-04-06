import dotenv from 'dotenv';
dotenv.config();
import faker from 'faker';
import { CONFLICT, CREATED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import supertest from 'supertest';
import { TEXT_LENGTH } from '../../../../../../../constants';
import { API_V1, AUTH, REGISTER } from '../../../../../../../constants/routes';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import initTests from '../../../../../utils/tests/initTests';

import {
  TEST_DIFFERENT_VALID_PASSWORD,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

const emailSubject = 'subject';
const link = 'link';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

jest.mock('../../../../../../../utils/helpers/url/getVerifyEmailUrl', () =>
  jest.fn(() => link)
);

jest.mock('../../../../../../../utils/helpers/date/getUtcDate', () =>
  jest.fn(() => '2000-04-05T23:26:42.000Z')
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
interface AssertOptions {
  readonly request: supertest.SuperTest<any>;
  readonly fields?: { [key: string]: any };
  readonly statusCode?: number;
}

export const assertOnResponseAndStatus = async ({
  request,
  fields,
  statusCode = UNPROCESSABLE_ENTITY,
}: AssertOptions) => {
  const { status, body } = await request.post(REGISTER_URL).send(fields);

  expect(status).toBe(statusCode);
  expect(body).toMatchSnapshot();

  return { status, body };
};

export const assertWithRequiredFieldAlreadyIncluded = ({
  request,
  fields,
  statusCode,
}: AssertOptions) =>
  assertOnResponseAndStatus({
    fields: {
      ...validRequiredFields,
      ...fields,
    },
    request,
    statusCode,
  });

describe('@presenter/auth/register', () => {
  const { request, service, mailServer } = initTests({ useMailServer: true });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('fails to register user without required fields', async () => {
    await assertOnResponseAndStatus({
      request,
    });
  });

  it('fails to register user when email is missing out of required properties', async () => {
    await assertOnResponseAndStatus({
      fields: {
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
      },
      request,
    });
  });

  it('fails to register user when password is missing out of required properties', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password_confirmation: TEST_VALID_PASSWORD,
      },
      request,
    });
  });

  it('fails to register user when password_confirmation is missing out of required properties', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
      },
      request,
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
    });
  });

  it('fails to register user when bio exceeds number of characters', async () => {
    await assertWithRequiredFieldAlreadyIncluded({
      fields: {
        bio: faker.random.alphaNumeric(TEXT_LENGTH),
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

    await assertWithRequiredFieldAlreadyIncluded({
      fields,
      request,
      statusCode: CREATED,
    });

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
