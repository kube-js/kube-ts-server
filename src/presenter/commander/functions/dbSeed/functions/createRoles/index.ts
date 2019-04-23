// tslint:disable:no-console
import { v4 as uuid } from 'uuid';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';

const createRoles = (config: FactoryConfig) => async (roles: string[] = []) => {
  console.log(`--------------------------------------------------------`);
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

  const items = await Promise.all(rolesPromises);

  const rolesIds = items.map(({ item }) => item.id);

  console.log(`Roles created successfuly!`);
  console.log(`--------------------------------------------------------`);

  return Promise.resolve(rolesIds);
};

export default createRoles;
