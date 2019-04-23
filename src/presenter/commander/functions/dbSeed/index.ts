// tslint:disable:no-console
import _pluck from 'ramda/src/pluck';
import {
  ADMIN_PERMISSIONS,
  USER_PERMISSIONS,
} from '../../../../constants/permissions';
import { ADMIN, USER } from '../../../../constants/roles';
import { TEST_VALID_PASSWORD } from '../../../express/utils/tests/testData';
import FactoryConfig from '../../presenterFactory/FactoryConfig';
import permissions from '../../utils/permissions';
import connectPermissionsToRoles from './functions/connectPermissionsToRoles';
import createPermissions from './functions/createPermissions';
import createRoles from './functions/createRoles';
import createUser from './functions/createUser';

const adminOptions = {
  defaultEmail: 'admin@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Admin',
};

const userOptions = {
  defaultEmail: 'user@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'User',
};

const dbSeed = (config: FactoryConfig) => async () => {
  /* TODO: implement logger */
  try {
    const [adminRoleId, userRoleId] = await createRoles(config)([ADMIN, USER]);
    console.log('here', adminRoleId, userRoleId);
    const createdPermissions = await createPermissions(config)(permissions);

    const adminPermissions = createdPermissions.filter(({ name }) =>
      ADMIN_PERMISSIONS.includes(name)
    );

    const adminPermissionsIds = _pluck('id', adminPermissions);

    const userPermissions = createdPermissions.filter(({ name }) =>
      USER_PERMISSIONS.includes(name)
    );

    const userPermissionsIds = _pluck('id', userPermissions);

    await connectPermissionsToRoles(config)({
      permissionsIds: adminPermissionsIds,
      roleId: adminRoleId,
      roleName: ADMIN,
    });

    await connectPermissionsToRoles(config)({
      permissionsIds: userPermissionsIds,
      roleId: userRoleId,
      roleName: USER,
    });

    // admin user
    await createUser(config)({
      ...adminOptions,
      rolesIds: [adminRoleId],
    });

    // regular user
    await createUser(config)({
      ...userOptions,
      rolesIds: [userRoleId],
    });

    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
};

export default dbSeed;
