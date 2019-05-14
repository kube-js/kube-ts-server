import _pick from 'ramda/src/pick';
import {
  ASSIGN_ROLE_PERMISSION,
  REVOKE_ROLE_PERMISSION,
} from '../../../../../../constants/routes';
import Role from '../../../../../../types/items/Role';
import Config from '../../../../presenterFactory/Config';
import beforeCreateRules, {
  beforeCreateSchema,
} from '../../../../utils/schemas/roles/createItem';
import beforeReplaceRules, {
  beforeReplaceSchema,
} from '../../../../utils/schemas/roles/replaceItem';
import beforeUpdateRules, {
  beforeUpdateSchema,
} from '../../../../utils/schemas/roles/updateItem';
import baseFactory from '../utils/baseFactory';
import convertItemIntoDocument from '../utils/convertItemIntoDocument';
import createPatch from '../utils/createPatch';
import assignRolePermission from './functions/assignRolePermission';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';
import revokeRolePermission from './functions/revokeRolePermission';

const rolesFactory = (config: Config) => {
  const enhancedConfig = {
    ...config,
    beforeCreateRules,
    beforeCreateSchema,
    beforeReplaceRules,
    beforeReplaceSchema,
    beforeUpdateRules,
    beforeUpdateSchema,
  };
  const router = baseFactory<Role>({
    config: enhancedConfig,
    factoryConfig: {
      convertDocumentIntoItem: convertDocumentIntoItem(enhancedConfig),
      convertItemIntoDocument: convertItemIntoDocument(enhancedConfig),
      createPatch: createPatch(enhancedConfig),
    },
    service: config.service.roles,
  });

  router.post(ASSIGN_ROLE_PERMISSION, assignRolePermission(enhancedConfig));
  router.delete(REVOKE_ROLE_PERMISSION, revokeRolePermission(enhancedConfig));

  return router;
};

export default rolesFactory;
