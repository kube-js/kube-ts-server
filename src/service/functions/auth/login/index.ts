import _isNil from 'ramda/src/isNil';
import { ACCOUNT_LOCKOUT_TIME_IN_MINUTES } from '../../../../constants';
import InvalidCredentialsError from '../../../../utils/errors/auth/InvalidCredentialsError';
import LockedAccountError from '../../../../utils/errors/auth/LockedAccountError';
import UnverifiedAccountError from '../../../../utils/errors/auth/UnverifiedAccountError';
import verifyPassword from '../../../../utils/helpers/auth/verifyPassword';
import fastForwardTimeBy from '../../../../utils/helpers/date/fastForwardTimeBy';
import isInTheFuture from '../../../../utils/helpers/date/isInTheFuture';
import incrementOrInitialise from '../../../../utils/helpers/math/incrementOrInitialise';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly email: string;
  readonly password: string;
}

export default ({ repo, appConfig }: Config) => async ({
  email,
  password,
}: Options) => {
  const { items } = await repo.users.getItems({
    filter: {
      deletedAt: {
        $eq: null,
      },
      email,
    },
  });

  if (items.length === 0) {
    throw new InvalidCredentialsError();
  }

  const user = items[0];

  if (user.verifiedAt === undefined) {
    throw new UnverifiedAccountError();
  }

  const isValidDate = user.accountLockoutExpiresAt !== undefined;
  const isAccountLocked = isInTheFuture(user.accountLockoutExpiresAt);

  if (isValidDate && isAccountLocked) {
    await repo.users.updateItem({
      id: user.id,
      patch: {
        loginFailedAttempts: incrementOrInitialise(user.loginFailedAttempts),
        loginLastAttemptAt: new Date(),
      },
    });

    throw new LockedAccountError();
  }

  const passwordMatches = await verifyPassword(user.password, password);

  if (!passwordMatches) {
    const loginFailedAttempts = incrementOrInitialise(user.loginFailedAttempts);

    const shouldLockAccount =
      loginFailedAttempts >= appConfig.auth.maxNumberOfLoginFailedAttempts;

    const accountLockoutExpiresAt = shouldLockAccount
      ? fastForwardTimeBy(ACCOUNT_LOCKOUT_TIME_IN_MINUTES, 'minutes')
      : null;

    await repo.users.updateItem({
      id: user.id,
      patch: {
        accountLockoutExpiresAt,
        loginFailedAttempts,
        loginLastAttemptAt: new Date(),
      },
    });

    throw new InvalidCredentialsError();
  }

  const { item: updatedUser } = await repo.users.updateItem({
    id: user.id,
    patch: {
      accountLockoutExpiresAt: undefined,
      loginFailedAttempts: 0,
      loginLastAttemptAt: new Date(),
    },
  });

  return updatedUser;
};
