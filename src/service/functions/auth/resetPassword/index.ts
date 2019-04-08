import moment from 'moment';
import { DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES } from '../../../../constants';
import { Options as MailOptions } from '../../../../repo/mail/nodemailer/functions/sendEmail';
import ExpiredResetPasswordTokenError from '../../../../utils/errors/auth/ExpiredResetPasswordTokenError';
import InvalidResetPasswordTokenError from '../../../../utils/errors/auth/InvalidResetPasswordTokenError';
import hashPassword from '../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import lessThanAgo from '../../../../utils/helpers/date/lessThanAgo';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly email: string;
  readonly password: string;
  readonly mailOptions: MailOptions;
  readonly token: string;
}

export default ({ repo }: Config) => async ({
  email,
  password,
  mailOptions,
  token,
}: Options) => {
  const { items } = await repo.resetPasswordTokens.getItems({
    filter: {
      id: token,
    },
  });

  if (items.length === 0) {
    throw new InvalidResetPasswordTokenError(email);
  }

  const resetPasswordTokenModel = items[0];

  const userId = resetPasswordTokenModel.userId;

  const { items: users } = await repo.users.getItems({
    filter: {
      email,
      id: userId,
    },
  });

  if (users.length === 0) {
    throw new InvalidResetPasswordTokenError(email);
  }

  const expiresAt = moment(resetPasswordTokenModel.expiresAt);

  if (!expiresAt.isValid()) {
    throw new InvalidResetPasswordTokenError(email);
  }

  const isTokenExpired = !lessThanAgo({
    date: resetPasswordTokenModel.expiresAt,
    unit: 'minutes',
    value: DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES,
  });

  if (isTokenExpired) {
    throw new ExpiredResetPasswordTokenError(email);
  }

  await repo.users.updateItem({
    id: userId,
    patch: {
      accountLockoutExpiresAt: undefined,
      loginFailedAttempts: 0,
      loginLastAttemptAt: undefined,
      password: await hashPassword(password),
      updatedAt: getUtcDate(),
    },
  });

  await repo.resetPasswordTokens.deleteItem({
    id: resetPasswordTokenModel.id,
  });

  await repo.sendEmail(mailOptions);
};
