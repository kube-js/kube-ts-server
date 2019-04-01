import faker from 'faker';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import supertest from 'supertest';
import { TEXT_LENGTH } from '../../../../../../../constants';
import { API_V1, AUTH, REGISTER } from '../../../../../../../constants/routes';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_DIFFERENT_VALID_PASSWORD,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

jest.mock('../../../../../../../utils/helpers/auth/generateToken', () =>
  jest.fn(() => 'token')
);

const validRequiredFields = {
  email: TEST_VALID_EMAIL,
  password: TEST_VALID_PASSWORD,
  password_confirmation: TEST_VALID_PASSWORD,
};

const REGISTER_URL = `${API_V1}${AUTH}${REGISTER}`;

export const validateOptionalField = async (
  request: supertest.SuperTest<any>,
  optionalField: { [key: string]: any }
) => {
  const payload = {
    ...validRequiredFields,
    ...optionalField,
  };
  const { status, body } = await request.post(REGISTER_URL).send(payload);

  expect(status).toBe(UNPROCESSABLE_ENTITY);
  expect(body).toMatchSnapshot();
};

describe('@presenter/auth/register', () => {
  const { request } = initTests();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('fails to register user without required fields', async () => {
    const { status, body } = await request.post(REGISTER_URL);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to register user when email is missing out of required properties', async () => {
    const payload = {
      password: TEST_VALID_PASSWORD,
      password_confirmation: TEST_VALID_PASSWORD,
    };
    const { status, body } = await request.post(REGISTER_URL).send(payload);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to register user when password is missing out of required properties', async () => {
    const payload = {
      email: TEST_VALID_EMAIL,
      password_confirmation: TEST_VALID_PASSWORD,
    };
    const { status, body } = await request.post(REGISTER_URL).send(payload);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to register user when password_confirmation is missing out of required properties', async () => {
    const payload = {
      email: TEST_VALID_EMAIL,
      password: TEST_VALID_PASSWORD,
    };
    const { status, body } = await request.post(REGISTER_URL).send(payload);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to register user when password and password_confirmation are not matching', async () => {
    const payload = {
      email: TEST_VALID_EMAIL,
      password: TEST_VALID_PASSWORD,
      password_confirmation: TEST_DIFFERENT_VALID_PASSWORD,
    };
    const { status, body } = await request.post(REGISTER_URL).send(payload);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to register user when bio exceeds number of characters', async () => {
    await validateOptionalField(request, {
      bio: faker.random.alphaNumeric(TEXT_LENGTH),
    });
  });

  it('fails to register user when date_of_birth is not valid date', async () => {
    await validateOptionalField(request, { date_of_birth: 'invalid date' });
  });

  it('fails to register user when first_name is invalid', async () => {
    await validateOptionalField(request, { first_name: 3232 });
  });

  it('fails to register user when gender is invalid', async () => {
    await validateOptionalField(request, { gender: 'non-existing-gender' });
  });

  it('fails to register user when last_name is invalid', async () => {
    await validateOptionalField(request, { last_name: 3232 });
  });
  // tslint:disable-next-line:max-file-line-count
});
