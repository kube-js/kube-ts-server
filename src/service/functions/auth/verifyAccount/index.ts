import _isNil from 'ramda/src/isNil';
import AccountAlreadyVerifiedError from '../../../../utils/errors/auth/AccountAlreadyVerifiedError';
import InvalidVerifyAccountTokenError from '../../../../utils/errors/auth/InvalidVerifyAccountTokenError';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly email: string;
  readonly token: string;
}

export default ({ repo }: Config) => async ({ email, token }: Options) => {
  const { items } = await repo.users.getItems({
    filter: {
      email,
      verifyToken: token,
    },
  });

  if (items.length === 0) {
    throw new InvalidVerifyAccountTokenError(email);
  }

  const user = items[0];

  if(!_isNil(user.verifiedAt)){
    throw new AccountAlreadyVerifiedError(email);
  }

  await repo.users.updateItem({
    id: user.id,
    patch: {
      updatedAt: getUtcDate(),
      verifiedAt: getUtcDate(),
    },
  });
};
