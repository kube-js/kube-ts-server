import _isNil from 'ramda/src/isNil';
import { GenderType } from '../../../../types/items/User';
import InvalidCredentialsError from '../../../../utils/errors/auth/InvalidCredentialsError';
import LockedAccountError from '../../../../utils/errors/auth/LockedAccountError';
import UnverifiedAccountError from '../../../../utils/errors/auth/UnverifiedAccountError';
import verifyPassword from '../../../../utils/helpers/auth/verifyPassword';
import generateLockoutExpiresAtDate from '../../../../utils/helpers/date/generateLockoutExpiresAtDate';
import isInTheFuture from '../../../../utils/helpers/date/isInTheFuture';
import incrementOrInitialise from '../../../../utils/helpers/math/incrementOrInitialise';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly bio: string;
  readonly dateOfBirth: string;
  readonly email: string;
  readonly firstName: string;
  readonly gender: GenderType.male | GenderType.female;
  readonly lastName: string;
  readonly password: string;
}

export default ({ repo, appConfig }: Config) => async ({
  // bio,
  // dateOfBirth,
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

  const passwordMatches = await verifyPassword(
    user.password as string,
    password
  );

  if (!passwordMatches) {
    const loginFailedAttempts = incrementOrInitialise(user.loginFailedAttempts);

    const shouldLockAccount =
      loginFailedAttempts >= appConfig.auth.maxNumberOfLoginFailedAttempts;

    const accountLockoutExpiresAt = shouldLockAccount
      ? generateLockoutExpiresAtDate()
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
  // tslint:disable-next-line:max-file-line-count
};
