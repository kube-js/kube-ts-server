import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { API_V1 } from '../../../../../../../constants/routes';
import initTests from '../../../../utils/test/initTests';

describe('@presenter/auth/login', () => {
  const { request } = initTests();

  it('should fail to log in user without input', async () => {
    const response = await request.post(`${API_V1}/auth/login`);

    expect(response.status).toBe(UNPROCESSABLE_ENTITY);
  });

  // it('should fail to log in user when email is invalid', async () => {
  //   const response = await request.post(`${API_V1}/auth/login`).send({
  //     email: TEST_INVALID_EMAIL,
  //     password: TEST_VALID_PASSWORD,
  //   });
  //   expect(response.status).toBe(UNAUTHORIZED);
  // });

  // it('should fail to log in a user without password', async () => {
  //   const response = await request
  //     .post(`${API_V1}/auth/login`)
  //     .send({ email: TEST_VALID_EMAIL });
  //   expect(response.status).toBe(UNAUTHORIZED);
  // });

  // it('should fail to log in when user does not exist', async () => {
  //   const response = await request
  //     .post(`${API_V1}/auth/login`)
  //     .send(TEST_VALID_LOGIN_USER);
  //   expect(response.status).toBe(UNAUTHORIZED);
  // });

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
});
