// tslint:disable:no-magic-numbers
import { OK, UNAUTHORIZED } from 'http-status-codes';
import moment from 'moment';
import { MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS } from '../../../../../../../constants';
import { API_V1, AUTH, LOGIN } from '../../../../../../../constants/routes';
import hashPassword from '../../../../../../../utils/helpers/auth/hashPassword';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import assertOnResponseAndStatus from '../../../../../utils/tests/assertOnResponseAndStatus';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_DIFFERENT_VALID_PASSWORD,
  TEST_INVALID_EMAIL,
  TEST_UUID,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

jest.mock('../../../../../../../utils/helpers/auth/generateToken', () =>
  jest.fn(() => 'token')
);

describe('@presenter/auth/login', () => {
  const { request, service } = initTests({});
  const LOGIN_URL = `${API_V1}${AUTH}${LOGIN}`;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fails to log in user without both credentials', async () => {
    await assertOnResponseAndStatus({
      fields: {},
      request,
      url: LOGIN_URL,
    });
  });

  it('fails to log in user without email', async () => {
    await assertOnResponseAndStatus({
      fields: {
        password: TEST_VALID_PASSWORD,
      },
      request,
      url: LOGIN_URL,
    });
  });

  it('locks user account when too many login requests attempted', async () => {
    const [user] = await usersFactory({
      overrides: {
        loginFailedAttempts: MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS,
        loginLockoutExpiresAt: moment()
          .add(60, 'minutes')
          .toDate(),
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: user.email,
        password: TEST_DIFFERENT_VALID_PASSWORD,
      },
      request,
      statusCode: UNAUTHORIZED,
      url: LOGIN_URL,
    });
  });

  it('fails to log in user without password', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      url: LOGIN_URL,
    });
  });

  it('fails to log in user with invalid email', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_INVALID_EMAIL,
        password: TEST_VALID_PASSWORD,
      },
      request,
      url: LOGIN_URL,
    });
  });

  it('should fail to log in when user does not exist', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
      },
      request,
      statusCode: UNAUTHORIZED,
      url: LOGIN_URL,
    });
  });

  it('should fail to log in a user when password is invalid', async () => {
    const [user] = await usersFactory({
      overrides: {
        loginFailedAttempts: MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS + 1,
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: user.email,
        password: TEST_DIFFERENT_VALID_PASSWORD,
      },
      request,
      statusCode: UNAUTHORIZED,
      url: LOGIN_URL,
    });
  });

  it('should fail to log in a user when user has been soft deleted', async () => {
    const [user] = await usersFactory({
      overrides: {
        deletedAt: new Date(),
        password: await hashPassword(TEST_VALID_PASSWORD),
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: user.email,
        password: TEST_VALID_PASSWORD,
      },
      request,
      statusCode: UNAUTHORIZED,
      url: LOGIN_URL,
    });
  });

  it('logs in user in succesfully', async () => {
    const [user] = await usersFactory({
      overrides: {
        id: '1',
        password: await hashPassword(TEST_VALID_PASSWORD),
        verifyToken: TEST_UUID,
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
    
    expect(body.roles).toEqual([]);
  });
  // tslint:disable-next-line:max-file-line-count
});
