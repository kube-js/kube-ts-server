// tslint:disable:no-console
import { v4 as uuid } from 'uuid';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';

export interface Options {
  readonly permissionsIds: string[];
  readonly roleId: string;
  readonly roleName: string;
}

const connectPermissionsToRoles = (config: FactoryConfig) => async ({
  permissionsIds,
  roleId,
  roleName,
}: Options) => {
  console.log(`--------------------------------------------------------`);
  console.log(`Connecting role [${roleName}] to permissions...`);

  const permissionsPromises = permissionsIds.map(async permissionId => {
    const rolePermissionId = uuid();

    return config.service.rolePermission.createItem({
      id: rolePermissionId,
      item: {
        createdAt: getUtcDate(),
        id: rolePermissionId,
        permissionId,
        roleId,
      },
    });
  });

  await Promise.all(permissionsPromises);

  console.log(`Connected role to permissions successfuly!`);
  console.log(`--------------------------------------------------------`);
};

export default connectPermissionsToRoles;
