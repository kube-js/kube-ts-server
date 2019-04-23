// tslint:disable:no-console
import _pluck from 'ramda/src/pluck';
import { v4 as uuid } from 'uuid';
import Permission from '../../../../../../types/items/Permission';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';

export interface PermissionPartial {
  readonly url: string;
  readonly method: string;
  readonly name: string;
}

const createPermissions = (config: FactoryConfig) => async (
  permissions: PermissionPartial[] = []
): Promise<Permission[]> => {
  console.log(`--------------------------------------------------------`);
  console.log(
    `Creating permissions [${permissions.map(({ name }) => name).join(', ')}]`
  );

  const permissionsPromises = permissions.map(async permission => {
    const roleId = uuid();

    return config.service.permissions.createItem({
      id: roleId,
      item: {
        ...permission,
        createdAt: getUtcDate(),
        id: roleId,
      },
    });
  });

  const results = await Promise.all(permissionsPromises);

  console.log(`Permissions created successfuly!`);
  console.log(`--------------------------------------------------------`);

  const permissionsModels = _pluck('item', results);

  return Promise.resolve(permissionsModels);
};

export default createPermissions;
