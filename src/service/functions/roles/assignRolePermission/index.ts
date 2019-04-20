import { ConflictingItemError } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import { v4 as uuid } from 'uuid';
import ConflictError from '../../../../utils/errors/http/ConflictError';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly permissionId: string;
  readonly roleId: string;
}

export default ({ repo }: Config) => async ({ permissionId, roleId }: Options) => {
  try {
    const id = uuid();

    await repo.rolePermission.createItem({
      id,
      item: {
        createdAt: getUtcDate(),
        id,
        permissionId,
        roleId,
      },
    });
  } catch (error) {
    if (error instanceof ConflictingItemError) {
      throw new ConflictError(error.itemName, error.itemId);
    }

    throw error;
  }
};
