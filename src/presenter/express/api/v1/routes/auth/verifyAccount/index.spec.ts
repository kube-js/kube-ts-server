import dotenv from 'dotenv';
import assertOnResponseAndStatus from '../../../../../utils/tests/assertOnResponseAndStatus';
dotenv.config();
import { CONFLICT, OK } from 'http-status-codes';
import {
  API_V1,
  AUTH,
  VERIFY_ACCOUNT,
} from '../../../../../../../constants/routes';
import getUtcDate from '../../../../../../../utils/helpers/date/getUtcDate';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_INVALID_EMAIL,
  TEST_UUID,
  TEST_VALID_EMAIL,
} from '../../../../../utils/tests/testData';

jest.mock('uuid', () => ({
  v4: jest.fn(() => TEST_UUID),
}));

const VERIFY_ACCOUNT_URL = `${API_V1}${AUTH}${VERIFY_ACCOUNT}`;

describe('@presenter/auth/verifyAccount', () => {
  const { request, service } = initTests({ useMailServer: true });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fails to verify account without payload', async () => {
    await assertOnResponseAndStatus({
      request,
      url: VERIFY_ACCOUNT_URL,
    });
  });

  it('fails to verify account without valid email', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_INVALID_EMAIL,
        token: TEST_UUID,
      },
      request,
      url: VERIFY_ACCOUNT_URL,
    });
  });

  it('fails to verify account without token', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      url: VERIFY_ACCOUNT_URL,
    });
  });

  it('fails to verify when email does not match', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        token: TEST_UUID,
      },
      request,
      url: VERIFY_ACCOUNT_URL,
    });
  });

  it('fails to verify when token does not match', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        verifyToken: 'other-token',
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        token: TEST_UUID,
      },
      request,
      url: VERIFY_ACCOUNT_URL,
    });
  });

  it('verifies account when valid email and token is provided', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        id: TEST_UUID,
        verifiedAt: undefined,
        verifyToken: TEST_UUID,
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        token: TEST_UUID,
      },
      request,
      statusCode: OK,
      url: VERIFY_ACCOUNT_URL,
    });
  });

  it.only('fails to verify already verified account', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        id: TEST_UUID,
        verifiedAt: getUtcDate(),
        verifyToken: TEST_UUID,
      },
      service: service.users,
    });
    
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        token: TEST_UUID,
      },
      request,
      statusCode: CONFLICT,
      url: VERIFY_ACCOUNT_URL,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
