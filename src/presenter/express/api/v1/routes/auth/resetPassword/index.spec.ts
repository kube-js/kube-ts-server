import dotenv from 'dotenv';
import moment from 'moment';
import assertOnResponseAndStatus from '../../../../../utils/tests/assertOnResponseAndStatus';
dotenv.config();
import { OK } from 'http-status-codes';
import { DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES } from '../../../../../../../constants';
import {
  API_V1,
  AUTH,
  RESET_PASSWORD,
} from '../../../../../../../constants/routes';
import resetPasswordTokensFactory from '../../../../../utils/fakeFactories/resetPasswordTokens/factory';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_DIFFERENT_VALID_PASSWORD,
  TEST_UUID,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
} from '../../../../../utils/tests/testData';

const emailSubject = 'subject';
const link = 'link';

jest.mock('uuid', () => ({
  v4: jest.fn(() => TEST_UUID),
}));

const RESET_PASSWORD_URL = `${API_V1}${AUTH}${RESET_PASSWORD}`;

describe('@presenter/auth/resetPassword', () => {
  const { request, service, mailServer } = initTests({ useMailServer: true });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fails to reset password without payload', async () => {
    await assertOnResponseAndStatus({
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password without password', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password_confirmation: TEST_DIFFERENT_VALID_PASSWORD,
        token: TEST_UUID,
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password without password_confirmation', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        token: TEST_UUID,
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password when password does not match password_confirmation', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_DIFFERENT_VALID_PASSWORD,
        token: TEST_UUID,
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password without token', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password with invalid token', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
        token: 'too-short-token',
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password when reset password token does not exist in db', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
        token: TEST_UUID,
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('fails to reset password when reset password token is expired', async () => {
    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        id: TEST_UUID,
      },
      service: service.users,
    });

    const expiresAt = moment()
      .subtract(DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES + 1, 'minutes')
      .toDate();

    await resetPasswordTokensFactory({
      overrides: {
        expiresAt,
        id: TEST_UUID,
        userId: TEST_UUID,
      },
      service: service.resetPasswordTokens,
    });

    expect(mailServer.messages.length).toBe(0);

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
        token: TEST_UUID,
      },
      request,
      url: RESET_PASSWORD_URL,
    });
  });

  it('resets password and send confirming email', async () => {
    jest.mock('../../../../../../../translator/factory.ts', () => () => ({
      reserPasswordHtml: jest.fn(() => link),
      reserPasswordSubject: () => emailSubject,
      reserPasswordText: jest.fn(() => link),
    }));

    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
        id: TEST_UUID,
      },
      service: service.users,
    });

    const expiresAt = moment()
      .subtract(DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES - 1, 'minutes')
      .toDate();

    await resetPasswordTokensFactory({
      overrides: {
        expiresAt,
        id: TEST_UUID,
        userId: TEST_UUID,
      },
      service: service.resetPasswordTokens,
    });

    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        password: TEST_VALID_PASSWORD,
        password_confirmation: TEST_VALID_PASSWORD,
        token: TEST_UUID,
      },
      request,
      statusCode: OK,
      url: RESET_PASSWORD_URL,
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
