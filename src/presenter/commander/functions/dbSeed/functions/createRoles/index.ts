// tslint:disable:no-console
import { v4 as uuid } from 'uuid';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';

const createRoles = (config: FactoryConfig) => async (roles: string[] = []) => {
  console.log(`Creating roles [${roles.join(', ')}] created successfuly!`);

  const rolesPromises = roles.map(async name => {
    const roleId = uuid();

    return config.service.roles.createItem({
      id: roleId,
      item: {
        createdAt: getUtcDate(),
        id: roleId,
        name,
      },
    });
  });

  await Promise.all(rolesPromises);
  
  console.log(`Roles created successfuly!`);
};

export default createRoles;
