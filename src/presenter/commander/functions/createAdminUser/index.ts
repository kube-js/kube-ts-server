// tslint:disable:no-console
import Record from 'rulr/Record';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import hashPassword from '../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import Email from '../../../../utils/validation/rules/Email';
import Password from '../../../../utils/validation/rules/Password';
import FactoryConfig from '../../presenterFactory/FactoryConfig';
import adminPermissions from '../../utils/permissions/adminPermissions';

const rules = Record({
  email: Email(),
  password: Password(),
});

export default (config: FactoryConfig) => async (
  email: string,
  password: string
) => {
  /* TODO: implement logger */
  try {
    const { service } = config;
    console.log('Creating admin user...');

    console.log('Validating input...');
    validateData(rules)({ email, password });
    console.log('Input validated successfuly!');

    console.log('Creating user...');
    const userId = uuid();
    const { item: user } = await service.users.createItem({
      id: userId,
      item: {
        createdAt: getUtcDate(),
        email,
        id: userId,
        password: await hashPassword(password),
        verifiedAt: getUtcDate(),
      },
    });
    console.log('User created successfuly!');

    console.log('Creating role...');
    // create role
    const roleId = uuid();
    const { item: role } = await service.roles.createItem({
      id: roleId,
      item: {
        createdAt: getUtcDate(),
        id: roleId,
        name: 'admin',
      },
    });
    console.log('Role created successfuly!');

    console.log('Assigning role to user...');
    const userRoleId = uuid();
    await service.userRole.createItem({
      id: userRoleId,
      item: {
        createdAt: getUtcDate(),
        id: userRoleId,
        roleId: role.id,
        userId: user.id,
      },
    });
    console.log('Role assigned successfuly!');

    console.log('Creating permissions...');
    const permissionsPromises = adminPermissions.map(async permission => {
      const id = uuid();

      return service.permissions.createItem({
        id,
        item: {
          ...permission,
          createdAt: getUtcDate(),
          id,
        },
      });
    });
    console.log('Permissions created successfuly!');

    const results = await Promise.all(permissionsPromises);

    const permissionsIds = results.map(result => result.item.id);

    console.log('Assigning permissions to tole...');
    const rolePermissionsPromises = permissionsIds.map(permissionId =>
      service.rolePermission.createItem({
        id: userRoleId,
        item: {
          createdAt: getUtcDate(),
          id: userRoleId,
          permissionId,
          roleId: role.id,
        },
      })
    );
    console.log('Permissions assigned successfuly!');

    console.log('Finito!');

    process.exit(0);
    await Promise.all(rolePermissionsPromises);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
  // tslint:disable-next-line:max-file-line-count
};
