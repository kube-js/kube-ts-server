import { ConflictingItemError } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import { v4 as uuid } from 'uuid';
import ConflictError from '../../../../utils/errors/http/ConflictError';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly userId: string;
  readonly roleId: string;
}

export default ({ repo }: Config) => async ({ userId, roleId }: Options) => {
  try {
    const id = uuid();

    await repo.userRole.createItem({
      id,
      item: {
        createdAt: getUtcDate(),
        id,
        roleId,
        userId,
      },
    });
  } catch (error) {
    if (error instanceof ConflictingItemError) {
      throw new ConflictError(error.itemName, error.itemId);
    }

    throw error;
  }
};
