import _pluck from 'ramda/src/pluck';
import {
  ADMIN_PERMISSIONS,
  INSTRUCTOR_PERMISSIONS,
  STUDENT_PERMISSIONS,
} from '../../../../constants/permissions';
import { ADMIN, INSTRUCTOR, STUDENT } from '../../../../constants/roles';
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

const studentOptions = {
  defaultEmail: 'student@example.com',
  defaultPassword: TEST_VALID_PASSWORD,
  userType: 'Student',
};

export const processExitTimeout = 10000;

const dbSeed = (config: FactoryConfig) => async () => {
  try {
    const [adminRoleId, instructorRoleId, studentRoleId] = await createRoles(
      config
    )([ADMIN, INSTRUCTOR, STUDENT]);

    const createdPermissions = await createPermissions(config)(permissions);

    const adminPermissions = createdPermissions.filter(({ name }) =>
      ADMIN_PERMISSIONS.includes(name)
    );

    const adminPermissionsIds = _pluck('id', adminPermissions);

    const instructorPermissions = createdPermissions.filter(({ name }) =>
      INSTRUCTOR_PERMISSIONS.includes(name)
    );

    const studentPermissions = createdPermissions.filter(({ name }) =>
      STUDENT_PERMISSIONS.includes(name)
    );

    const studentPermissionsIds = _pluck('id', studentPermissions);
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
      permissionsIds: studentPermissionsIds,
      roleId: studentRoleId,
      roleName: STUDENT,
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

    // student
    await createUser(config)({
      ...studentOptions,
      rolesIds: [studentRoleId],
    });

    config.logger.info('Seeding successful');

    // FYI: allow logger to send all the logs
    setTimeout(() => {
      process.exit(0);
    }, processExitTimeout);
  } catch (err) {
    config.logger.error(`Seeding error ${err}`, err);

    // FYI: allow logger to send all the logs
    setTimeout(() => {
      process.exit(1);
    }, processExitTimeout);
  }
};

// tslint:disable-next-line:max-file-line-count
export default dbSeed;
