import dotenv from 'dotenv';
import assertOnResponseAndStatus from '../../../../../utils/tests/assertOnResponseAndStatus';
dotenv.config();
import { CONFLICT, OK, TOO_MANY_REQUESTS } from 'http-status-codes';
import { VERIFY_LOCKOUT_TIME_IN_MINUTES } from '../../../../../../../constants';
import {
  API_V1,
  AUTH,
  RESEND_VERIFY_TOKEN,
} from '../../../../../../../constants/routes';
import fastForwardTimeBy from '../../../../../../../utils/helpers/date/fastForwardTimeBy';
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

const RESEND_VERIFY_TOKEN_URL = `${API_V1}${AUTH}${RESEND_VERIFY_TOKEN}`;

describe('@presenter/auth/resendVerifyToken', () => {
  const { request, service, mailServer } = initTests({ useMailServer: true });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fails to resend verifyToken without payload', async () => {
    await assertOnResponseAndStatus({
      request,
      url: RESEND_VERIFY_TOKEN_URL,
    });
  });

  it('fails to resend verifyToken without valid email', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_INVALID_EMAIL,
      },
      request,
      url: RESEND_VERIFY_TOKEN_URL,
    });
  });

  it('fails to resend verifyToken for already verified account', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      statusCode: CONFLICT,
      url: RESEND_VERIFY_TOKEN_URL,
    });
  });

  it('locks resend verifyToken functionality if more than 5 attempts made in last 10 minutes', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        verifiedAt: undefined,
        verifyAttempts: 6,
        verifyLockoutExpiresAt: null
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      statusCode: TOO_MANY_REQUESTS,
      url: RESEND_VERIFY_TOKEN_URL,
    });
  });

  it('fails to resend verifyToken if functionality is locked', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        verifiedAt: undefined,
        verifyAttempts: 3,
        verifyLastAttemptAt: getUtcDate(),
        verifyLockoutExpiresAt: fastForwardTimeBy(
          VERIFY_LOCKOUT_TIME_IN_MINUTES,
          'minutes'
        ),
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      statusCode: TOO_MANY_REQUESTS,
      url: RESEND_VERIFY_TOKEN_URL,
    });
  });

  it('sends successfully verifyToken', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        verifiedAt: undefined,
        verifyToken: TEST_UUID,
      },
      service: service.users,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      statusCode: OK,
      url: RESEND_VERIFY_TOKEN_URL,
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
