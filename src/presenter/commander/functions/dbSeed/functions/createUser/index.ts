// tslint:disable:no-console
import promptly from 'promptly';
import Record from 'rulr/Record';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import { VARCHAR_LENGTH } from '../../../../../../constants';
import hashPassword from '../../../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import Email from '../../../../../../utils/validation/rules/Email';
import String from '../../../../../../utils/validation/rules/String';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';

const rules = Record({
  email: Email(),
  // FYI: intential just String validation on password,
  // allowing weak passwords for development
  password: String(0, VARCHAR_LENGTH),
});

export interface Options {
  readonly userType: string;
  readonly defaultEmail: string;
  readonly defaultPassword: string;
  readonly rolesIds: string[];
}

const createUser = (config: FactoryConfig) => async ({
  defaultEmail,
  defaultPassword,
  rolesIds,
  userType,
}: Options) => {
  console.log(`--------------------------------------------------------`);
  console.log(`Creating ${userType}...`);

  const email = await promptly.prompt(
    `Choose email [default: ${defaultEmail}]: `,
    { default: defaultEmail }
  );
  const password = await promptly.password(
    `Choose password [default: ${defaultPassword}]: `,
    { default: defaultPassword }
  );

  const { service } = config;

  console.log('Validating input...');
  validateData(rules)({ email, password });
  console.log('Input validated successfuly!');

  console.log(`Creating ${userType}...`);

  const userId = uuid();

  const { item: user } = await service.users.createItem({
    id: userId,
    item: {
      createdAt: getUtcDate(),
      email,
      id: userId,
      password: await hashPassword(password),
      verifiedAt: getUtcDate(),
      verifyToken: uuid()
    },
  });

  console.log(`${userType} created successfuly!`);

  console.log('Assigning role to user...');

  const userRolesPromises = rolesIds.map(async roleId => {
    const userRoleId = uuid();

    return service.userRole.createItem({
      id: userRoleId,
      item: {
        createdAt: getUtcDate(),
        id: userRoleId,
        roleId,
        userId: user.id
      },
    });
  });

  await Promise.all(userRolesPromises);

  console.log('Role assigned successfuly!');
  console.log(`--------------------------------------------------------`);
};

export default createUser;
