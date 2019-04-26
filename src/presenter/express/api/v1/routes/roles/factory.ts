import _pick from 'ramda/src/pick';
import {
  ASSIGN_ROLE_PERMISSION,
  REVOKE_ROLE_PERMISSION,
} from '../../../../../../constants/routes';
import Role from '../../../../../../types/items/Role';
import Config from '../../../../presenterFactory/Config';
import baseFactory from '../utils/baseFactory';
import convertItemIntoDocument from '../utils/convertItemIntoDocument';
import createPatch from '../utils/createPatch';
import assignRolePermission from './functions/assignRolePermission';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';
import revokeRolePermission from './functions/revokeRolePermission';

const rolesFactory = (config: Config) => {
  const router = baseFactory<Role>({
    config,
    factoryConfig: {
      convertDocumentIntoItem: convertDocumentIntoItem(config),
      convertItemIntoDocument: convertItemIntoDocument(config),
      createPatch: createPatch(config),
    },
    service: config.service.roles,
  });

  router.post(ASSIGN_ROLE_PERMISSION, assignRolePermission(config));
  router.delete(REVOKE_ROLE_PERMISSION, revokeRolePermission(config));

  return router;
};

export default rolesFactory;
