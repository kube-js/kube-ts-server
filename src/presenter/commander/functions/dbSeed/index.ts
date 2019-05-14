import _pluck from 'ramda/src/pluck';
import {
  ADMIN_PERMISSIONS,
  INSTRUCTOR_PERMISSIONS,
  LEARNER_PERMISSIONS,
} from '../../../../constants/permissions';
import { ADMIN, INSTRUCTOR, LEARNER } from '../../../../constants/roles';
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

const instructorsOptions = {
  defaultEmail: 'instructor@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Instructor',
};

const learnerOptions = {
  defaultEmail: 'learner@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'User',
};

const processExitTimeout = 10000;

const dbSeed = (config: FactoryConfig) => async () => {
  try {
    const [adminRoleId, instructorRoleId, learnerRoleId] = await createRoles(
      config
    )([ADMIN, INSTRUCTOR, LEARNER]);

    const createdPermissions = await createPermissions(config)(permissions);

    const adminPermissions = createdPermissions.filter(({ name }) =>
      ADMIN_PERMISSIONS.includes(name)
    );

    const adminPermissionsIds = _pluck('id', adminPermissions);

    const instructorPermissions = createdPermissions.filter(({ name }) =>
      INSTRUCTOR_PERMISSIONS.includes(name)
    );

    const learnerPermissions = createdPermissions.filter(({ name }) =>
      LEARNER_PERMISSIONS.includes(name)
    );

    const learnerPermissionsIds = _pluck('id', learnerPermissions);
    const instructorPermissionsIds = _pluck('id', instructorPermissions);

    await connectPermissionsToRoles(config)({
      permissionsIds: adminPermissionsIds,
      roleId: adminRoleId,
      roleName: ADMIN,
    });

    await connectPermissionsToRoles(config)({
      permissionsIds: instructorPermissionsIds,
      roleId: instructorRoleId,
      roleName: INSTRUCTOR,
    });

    await connectPermissionsToRoles(config)({
      permissionsIds: learnerPermissionsIds,
      roleId: learnerRoleId,
      roleName: LEARNER,
    });

    // admin
    await createUser(config)({
      ...adminOptions,
      rolesIds: [adminRoleId],
    });

    // instructor
    await createUser(config)({
      ...instructorsOptions,
      rolesIds: [instructorRoleId],
    });

    // learner
    await createUser(config)({
      ...learnerOptions,
      rolesIds: [learnerRoleId],
    });

    config.logger.info('Seeding successful');

    // FYI: allow logger to send all the logs
    setTimeout(() => {
      process.exit(0);
    }, processExitTimeout);
  } catch (err) {
    config.logger.error(`Seeding error ${err}`);

    // FYI: allow logger to send all the logs
    setTimeout(() => {
      process.exit(1);
    }, processExitTimeout);
  }
};

// tslint:disable-next-line:max-file-line-count
export default dbSeed;
