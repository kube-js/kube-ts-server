
// tslint:disable:no-magic-numbers
import { OK, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import moment from 'moment';
import { MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS } from '../../../../../../../constants';
import { API_V1, AUTH, LOGIN } from '../../../../../../../constants/routes';
import hashPassword from '../../../../../../../utils/helpers/auth/hashPassword';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_DIFFERENT_VALID_PASSWORD,
  TEST_INVALID_EMAIL,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

jest.mock(
  '../../../../../../../utils/helpers/auth/generateToken',
  () => jest.fn(() => 'token')
);

describe('@presenter/auth/login', () => {
  const { request, service } = initTests();
  const LOGIN_URL = `${API_V1}${AUTH}${LOGIN}`;

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('fails to log in user without both credentials', async () => {
    const { status, body } = await request.post(LOGIN_URL);

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user without email', async () => {
    const { status, body } = await request.post(LOGIN_URL).send({
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('locks user account when too many login requests attempted', async () => {
    const [user] = await usersFactory({
      overrides: {
        accountLockoutExpiresAt: moment().add(60, 'minutes').toDate(),
        loginFailedAttempts: MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS,
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });
    const {status, body} = await request.post(LOGIN_URL).send({
      email: user.email,
      password: TEST_DIFFERENT_VALID_PASSWORD,
    }) 

    expect(status).toBe(UNAUTHORIZED);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user without email', async () => {
    const { status, body } = await request.post(LOGIN_URL).send({
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user without password', async () => {
    const { status, body } = await request.post(LOGIN_URL).send({
      email: TEST_VALID_EMAIL,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('fails to log in user with invalid email', async () => {
    const { status, body } = await request.post(LOGIN_URL).send({
      email: TEST_INVALID_EMAIL,
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNPROCESSABLE_ENTITY);
    expect(body).toMatchSnapshot();
  });

  it('should fail to log in when user does not exist', async () => {
    const { body, status } = await request.post(LOGIN_URL).send({
      email: TEST_VALID_EMAIL,
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(UNAUTHORIZED);
    expect(body).toMatchSnapshot();
  });

  it('should fail to log in a user when password is invalid', async () => {
    const [user] = await usersFactory({
      overrides: {
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });

    const { status, body } = await request
      .post(`${API_V1}${AUTH}${LOGIN}`)
      .send({
        email: user.email,
        password: TEST_DIFFERENT_VALID_PASSWORD,
      });

    expect(status).toBe(UNAUTHORIZED);
    expect(body).toMatchSnapshot();
  });

  it('should fail to log in a user when user account is not verified', async () => {
    const [user] = await usersFactory({
      overrides: {
        password: await hashPassword(TEST_VALID_PASSWORD),
        verifiedAt: undefined,
      },
      service: service.users,
    });

    const { status, body } = await request
      .post(`${API_V1}${AUTH}${LOGIN}`)
      .send({
        email: user.email,
        password: TEST_VALID_PASSWORD,
      });

    expect(status).toBe(UNAUTHORIZED);
    expect(body).toMatchSnapshot();
  });

  it('should fail to log in a user when user has been soft deleted', async () => {
    const [user] = await usersFactory({
      overrides: {
        deletedAt: new Date(),
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });

    const { status, body } = await request
      .post(`${API_V1}${AUTH}${LOGIN}`)
      .send({
        email: user.email,
        password: TEST_VALID_PASSWORD,
      });

    expect(status).toBe(UNAUTHORIZED);
    expect(body).toMatchSnapshot();
  });

  it('should succesfully log in a user', async () => {
    const [user] = await usersFactory({
      overrides: {
        id: '1',
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });

    const { status, body } = await request.post(LOGIN_URL).send({
      email: user.email,
      password: TEST_VALID_PASSWORD,
    });

    expect(status).toBe(OK);
    expect(body.token).toBe('token');
    expect(body.user.email).toBe(user.email);
    expect(body.user.id).toBe(user.id);
  });
// tslint:disable-next-line:max-file-line-count
});
