import moment from 'moment';
import { DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES } from '../../../../constants';
import { BaseOptions } from '../../../../repo/mail/nodemailer/functions/sendEmail';
import ExpiredResetPasswordTokenError from '../../../../utils/errors/auth/ExpiredResetPasswordTokenError';
import InvalidResetPasswordTokenError from '../../../../utils/errors/auth/InvalidResetPasswordTokenError';
import hashPassword from '../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import lessThanAgo from '../../../../utils/helpers/date/lessThanAgo';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly password: string;
  readonly mailOptions: BaseOptions;
  readonly token: string;
}

export default ({ repo }: Config) => async ({
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
    throw new InvalidResetPasswordTokenError(token);
  }

  const resetPasswordTokenModel = items[0];

  const userId = resetPasswordTokenModel.userId;

  const { items: users } = await repo.users.getItems({
    filter: {
      id: userId,
    },
  });

  if (users.length === 0) {
    throw new InvalidResetPasswordTokenError(token);
  }

  const user = users[0];

  const expiresAt = moment(resetPasswordTokenModel.expiresAt);

  if (!expiresAt.isValid()) {
    throw new InvalidResetPasswordTokenError(token);
  }

  const isTokenExpired = !lessThanAgo({
    date: resetPasswordTokenModel.expiresAt,
    unit: 'minutes',
    value: DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES,
  });

  if (isTokenExpired) {
    throw new ExpiredResetPasswordTokenError(token);
  }

  await repo.users.updateItem({
    id: userId,
    patch: {
      loginFailedAttempts: 0,
      loginLastAttemptAt: undefined,
      loginLockoutExpiresAt: undefined,
      password: await hashPassword(password),
      updatedAt: getUtcDate(),
    },
  });

  await repo.resetPasswordTokens.deleteItem({
    id: resetPasswordTokenModel.id,
  });

  await repo.sendEmail({ ...mailOptions, to: user.email });
};
