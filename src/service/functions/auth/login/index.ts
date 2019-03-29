import _isNil from 'ramda/src/isNil';
import User from '../../../../types/items/User';
import InvalidCredentialsError from '../../../../utils/errors/auth/InvalidCredentialsError';
import LockedAccountError from '../../../../utils/errors/auth/LockedAccountError';
import UnverifiedAccountError from '../../../../utils/errors/auth/UnverifiedAccountError';
import generateToken from '../../../../utils/helpers/auth/generateToken';
import verifyPassword from '../../../../utils/helpers/auth/verifyPassword';
import generateLockoutExpiresAtDate from '../../../../utils/helpers/date/generateLockoutExpiresAtDate';
import isInTheFuture from '../../../../utils/helpers/date/isInTheFuture';
import incrementOrInitialise from '../../../../utils/helpers/math/incrementOrInitialise';
import getVisibleUserProperties from '../../../../utils/helpers/model/getVisibleUserProperties';
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
      deletedAt: null,
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

  const passwordMatches = await verifyPassword(
    user.password as string,
    password
  );

  if (!passwordMatches) {
    const loginFailedAttempts = incrementOrInitialise(user.loginFailedAttempts);
    const shouldLockAccount =
      loginFailedAttempts >= appConfig.auth.maxNumberOfLoginFailedAttempts;
    const accountLockoutExpiresAt = shouldLockAccount
      ? { accountLockoutExpiresAt: generateLockoutExpiresAtDate() }
      : {};

    await repo.users.updateItem({
      id: user.id,
      patch: {
        loginFailedAttempts,
        loginLastAttemptAt: new Date(),
        ...accountLockoutExpiresAt,
      },
    });

    throw new InvalidCredentialsError();
  }

  await repo.users.updateItem({
    id: user.id,
    patch: {
      accountLockoutExpiresAt: undefined,
      loginFailedAttempts: 0,
      loginLastAttemptAt: new Date(),
    },
  });

  const visibleUserData: Partial<User> = getVisibleUserProperties(user);

  const token: string = generateToken({
    config: appConfig.auth.jwt,
    data: visibleUserData,
  });

  return {
    token,
    user: visibleUserData,
  };
  // tslint:disable-next-line:max-file-line-count
};
