import { UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { API_V1 } from '../../../../../../../constants/routes';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_INVALID_EMAIL,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

describe('@presenter/auth/login', () => {
  const { request } = initTests();

  it('fails to log in user without both credentials', async () => {
    const { status, body } = await request.post(`${API_V1}/auth/login`);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user without email', async () => {
    const { status, body } = await request.post(`${API_V1}/auth/login`).send({
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user without password', async () => {
    const { status, body } = await request.post(`${API_V1}/auth/login`).send({
      email: TEST_VALID_EMAIL,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user with invalid email', async () => {
    const { status, body } = await request.post(`${API_V1}/auth/login`).send({
      email: TEST_INVALID_EMAIL,
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('should fail to log in when user does not exist', async () => {
    const { body, status } = await request.post(`${API_V1}/auth/login`).send({
      email: TEST_VALID_EMAIL,
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNAUTHORIZED);
    expect(body).toMatchSnapshot();
  });

  // it('should fail to log in a user when password is invalid', async () => {
  //   const registeredUser = await service.register(TEST_VALID_LOGIN_USER);

  //   const response = await request.post(`${API_V1}/auth/login`).send({
  //     email: TEST_VALID_LOGIN_USER.email,
  //     password: TEST_DIFFERENT_VALID_PASSWORD,
  //   });
  //   expect(response.status).toBe(UNAUTHORIZED);
  // });

  // it('should succesfully log in a user', async () => {
  //   const registeredUser = await service.register(TEST_VALID_REGISTER_USER);

  //   const response = await request.post(`${API_V1}/auth/login`).send({
  //     email: TEST_VALID_REGISTER_USER.email,
  //     password: TEST_VALID_REGISTER_USER.password,
  //   });

  //   const { user, token } = response.body;
  //   expect(response.status).toBe(OK);
  //   expect(response.status).toBe(UNAUTHORIZED);
  // });
  // tslint:disable-next-line:max-file-line-count
});
