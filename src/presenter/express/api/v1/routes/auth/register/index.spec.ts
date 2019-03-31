// import faker from 'faker';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
// import { TEXT_LENGTH } from '../../../../../../../constants';
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

describe('@presenter/auth/register', () => {
  const { request } = initTests();
  const REGISTER_URL = `${API_V1}${AUTH}${REGISTER}`;
  // const validRequiredFields = {
  //   email: TEST_VALID_EMAIL,
  //   password: TEST_VALID_PASSWORD,
  //   password_confirmation: TEST_VALID_PASSWORD,
  // };

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

  // it('fails to register user when bio exceeds number of characters', async () => {
  //   const payload = {
  //     ...validRequiredFields,
  //     bio: faker.lorem.text(TEXT_LENGTH + 1),
  //   };
  //   const { status, body } = await request.post(REGISTER_URL).send(payload);

  //   expect(status).toBe(UNPROCESSABLE_ENTITY);
  //   expect(body).toMatchSnapshot();
  // });

});
