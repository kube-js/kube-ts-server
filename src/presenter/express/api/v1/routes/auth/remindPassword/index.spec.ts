import dotenv from 'dotenv';
import assertOnResponseAndStatus from '../../../../../utils/tests/assertOnResponseAndStatus';
dotenv.config();
import { OK } from 'http-status-codes';
import {
  API_V1,
  AUTH,
  REMIND_PASSWORD,
} from '../../../../../../../constants/routes';
import usersFactory from '../../../../../utils/fakeFactories/users/factory';
import initTests from '../../../../../utils/tests/initTests';
import {
  TEST_INVALID_EMAIL,
  TEST_UUID,
  TEST_VALID_EMAIL,
} from '../../../../../utils/tests/testData';

const emailSubject = 'subject';
const link = 'link';

jest.mock('uuid', () => ({
  v4: jest.fn(() => TEST_UUID),
}));

const REMIND_PASSWORD_URL = `${API_V1}${AUTH}${REMIND_PASSWORD}`;

describe('@presenter/auth/register', () => {
  const { request, mailServer, service } = initTests({ useMailServer: true });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('fails to remind user password without email', async () => {
    await assertOnResponseAndStatus({
      request,
      url: REMIND_PASSWORD_URL,
    });
  });

  it('fails to remind user password when payload contains invalid email', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_INVALID_EMAIL,
      },
      request,
      url: REMIND_PASSWORD_URL,
    });

    expect(mailServer.messages.length).toBe(0);
  });

  it('fails to send reset password link when user does not exist', async () => {
    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
      },
      request,
      statusCode: OK, // @note: for security reasons
      url: REMIND_PASSWORD_URL,
    });
  });

  it('sends reset password link and create reset password token', async () => {
    jest.mock('../../../../../../../translator/factory.ts', () => () => ({
      verifyYourEmailHtml: jest.fn(() => link),
      verifyYourEmailSubject: () => emailSubject,
      verifyYourEmailText: jest.fn(() => link),
    }));

    await usersFactory({
      overrides: {
        email: TEST_VALID_EMAIL,
      },
      service: service.users,
    });


    await assertOnResponseAndStatus({
      fields: {
        email: TEST_VALID_EMAIL,
        id: TEST_UUID
      },
      request,
      statusCode: OK, // @note: for security reasons
      url: REMIND_PASSWORD_URL,
    });

    const { items } = await service.resetPasswordTokens.getItems({
      filter: {
        userId: TEST_UUID
      }
    });

    expect(items.length).toBe(1);
    expect(items[0].id).toBe(TEST_UUID);

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
