import { v4 as uuid } from 'uuid';
import { STUDENT } from '../../../../../constants/roles';
import Role from '../../../../../types/items/Role';
import baseFactory, { Options } from '../index';

const createRoleItemData = async () => ({
  id: uuid(),
  name: STUDENT,
});

const roleFactory = async (options: Options<Role>) => {
  const itemData = await createRoleItemData();

  return baseFactory<Role>(itemData as Partial<Role>)(options);
};

export default roleFactory;
