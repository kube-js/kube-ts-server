// tslint:disable:no-console
// import { TEST_VALID_PASSWORD } from '../../../express/utils/tests/testData';
import FactoryConfig from '../../presenterFactory/FactoryConfig';
// import adminPermissions from '../../utils/permissions';
// import usersPermissions from '../../utils/permissions/items/users';
// import createUser from './functions/createUser';

// const adminOptions = {
//   defaultEmail: 'admin@example.com',
//   defaultPassword: TEST_VALID_PASSWORD,
//   permissions: adminPermissions,
//   roleName: 'admin',
//   userType: 'Admin',
// };

// const userOptions = {
//   defaultEmail: 'user@example.com',
//   defaultPassword: TEST_VALID_PASSWORD,
//   permissions: usersPermissions,
//   roleName: 'user',
//   userType: 'User',
// };

const dbSeed = (_config: FactoryConfig) => async () => {
  /* TODO: implement logger */
  try {
    // await createUser(config)(adminOptions);
    // await createUser(config)(userOptions);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
};

export default dbSeed;
