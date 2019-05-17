import { QUERY_REGEX, UUID_REGEX } from '../../../../../../constants';
import {
  ROLES_ASSIGN_PERMISSION,
  ROLES_CREATE_ITEM,
  ROLES_DELETE_ITEM,
  ROLES_DELETE_ITEMS,
  ROLES_GET_ITEM,
  ROLES_GET_ITEMS,
  ROLES_REPLACE_ITEM,
  ROLES_REVOKE_PERMISSION,
  ROLES_UPDATE_ITEM,
} from '../../../../../../constants/permissions';

export const ROLES_URL_REGEX = '(/api/v1/roles)';

const rolesPermissions = [
  {
    method: 'GET',
    name: ROLES_GET_ITEM,
    url: `^${ROLES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'GET',
    name: ROLES_GET_ITEMS,
    url: `^${ROLES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: ROLES_CREATE_ITEM,
    url: `^${ROLES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: ROLES_ASSIGN_PERMISSION,
    url: `^${ROLES_URL_REGEX}/${UUID_REGEX}/permissions${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: ROLES_DELETE_ITEMS,
    url: `^${ROLES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: ROLES_DELETE_ITEM,
    url: `^${ROLES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: ROLES_REVOKE_PERMISSION,
    url: `^${ROLES_URL_REGEX}/${UUID_REGEX}/permissions/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PUT',
    name: ROLES_REPLACE_ITEM,
    url: `^${ROLES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PATCH',
    name: ROLES_UPDATE_ITEM,
    url: `^${ROLES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
];

export default rolesPermissions;
