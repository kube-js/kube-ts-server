import { ItemNotFoundError } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import { VERIFY_LOCKOUT_TIME_IN_MINUTES } from '../../../../constants';
import { Options as MailOptions } from '../../../../repo/mail/nodemailer/functions/sendEmail';
import AccountAlreadyVerifiedError from '../../../../utils/errors/auth/AccountAlreadyVerifiedError';
import VerifyLockoutError from '../../../../utils/errors/auth/VerifyLockoutError';
import fastForwardTimeBy from '../../../../utils/helpers/date/fastForwardTimeBy';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import lessThanAgo from '../../../../utils/helpers/date/lessThanAgo';
import incrementOrInitialise from '../../../../utils/helpers/math/incrementOrInitialise';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly email: string;
  readonly mailOptions: MailOptions;
}

export default ({ repo, appConfig }: Config) => async ({
  email,
  mailOptions,
}: Options) => {
  const { items } = await repo.users.getItems({
    filter: {
      email,
    },
  });

  if (items.length === 0) {
    // TODO: make internal error and not rely on library
    throw new ItemNotFoundError('User', email);
  }

  const user = items[0];
  let verifyAttempts = incrementOrInitialise(user.verifyAttempts);

  if (!_isNil(user.verifiedAt)) {
    await repo.users.updateItem({
      id: user.id,
      patch: {
        verifyAttempts,
        verifyLastAttemptAt: getUtcDate(),
        verifyLockoutExpiresAt: null,
      },
    });

    throw new AccountAlreadyVerifiedError(email);
  }

  const isLockedAlready =
    !_isNil(user.verifyLockoutExpiresAt) &&
    lessThanAgo({
      date: user.verifyLockoutExpiresAt,
      unit: 'minutes',
      value: '10',
    });

  if (isLockedAlready) {
    await repo.users.updateItem({
      id: user.id,
      patch: {
        verifyAttempts,
        verifyLastAttemptAt: getUtcDate(),
        verifyLockoutExpiresAt: fastForwardTimeBy(
          VERIFY_LOCKOUT_TIME_IN_MINUTES,
          'minutes'
        ),
      },
    });

    throw new VerifyLockoutError();
  }

  // verifyLockoutExpiresAt it's not empty but it's expired so we reset the counter
  if (!_isNil(user.verifyLockoutExpiresAt)) {
    verifyAttempts = 1;
  }

  if (verifyAttempts >= appConfig.auth.maxNumberOfVerifyAttempts) {
    await repo.users.updateItem({
      id: user.id,
      patch: {
        verifyAttempts,
        verifyLastAttemptAt: getUtcDate(),
        verifyLockoutExpiresAt: fastForwardTimeBy(
          VERIFY_LOCKOUT_TIME_IN_MINUTES,
          'minutes'
        ),
      },
    });

    throw new VerifyLockoutError();
  }

  await repo.users.updateItem({
    id: user.id,
    patch: {
      verifyAttempts,
      verifyLastAttemptAt: getUtcDate(),
      verifyLockoutExpiresAt: null,
    },
  });

  await repo.sendEmail(mailOptions);
// tslint:disable-next-line:max-file-line-count
};
