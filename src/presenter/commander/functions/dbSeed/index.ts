import _pluck from 'ramda/src/pluck';
import {
  ADMIN_PERMISSIONS,
  INSTRUCTOR_PERMISSIONS,
  STUDENT_PERMISSIONS,
} from '../../../../constants/permissions';
import { ADMIN, INSTRUCTOR, STUDENT } from '../../../../constants/roles';
import categories from '../../data/categories';
import sections from '../../data/sections';
import {
  adminOptions,
  firstInstructorOptions,
  firstStudentOptions,
  secondInstructorOptions,
  secondStudentOptions,
} from '../../data/users';
import FactoryConfig from '../../presenterFactory/FactoryConfig';
import permissions from '../../utils/permissions';
import connectPermissionsToRoles from './functions/connectPermissionsToRoles';
import createCategoriesAndCourses from './functions/createCategoriesAndCourses';
import createPermissions from './functions/createPermissions';
import createRoles from './functions/createRoles';
import createSectionsAndUnits from './functions/createSectionsAndUnits';
import createUser from './functions/createUser';

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

    // first instructor
    const firstInstructorId = await createUser(config)({
      ...firstInstructorOptions,
      rolesIds: [instructorRoleId],
    });

    // second instructor
    const secondInstructorId = await createUser(config)({
      ...secondInstructorOptions,
      rolesIds: [instructorRoleId],
    });

    // first student
    await createUser(config)({
      ...firstStudentOptions,
      rolesIds: [studentRoleId],
    });

    // second student
    await createUser(config)({
      ...secondStudentOptions,
      rolesIds: [studentRoleId],
    });

    const coursesIds = await createCategoriesAndCourses(config)({
      categories,
      instructorsIds: [firstInstructorId, secondInstructorId],
    });

    await createSectionsAndUnits(config)({
      coursesIds,
      sections,
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
