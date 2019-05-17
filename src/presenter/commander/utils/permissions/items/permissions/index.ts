import { QUERY_REGEX, UUID_REGEX } from '../../../../../../constants';
import {
  PERMISSIONS_CREATE_ITEM,
  PERMISSIONS_DELETE_ITEM,
  PERMISSIONS_DELETE_ITEMS,
  PERMISSIONS_GET_ITEM,
  PERMISSIONS_GET_ITEMS,
  PERMISSIONS_REPLACE_ITEM,
  PERMISSIONS_UPDATE_ITEM,
} from '../../../../../../constants/permissions';

export const PERMISSIONS_URL_REGEX = `(/api/v1/permissions)`;

const permissionsPermissions = [
  {
    method: 'GET',
    name: PERMISSIONS_GET_ITEM,
    url: `^${PERMISSIONS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'GET',
    name: PERMISSIONS_GET_ITEMS,
    url: `^${PERMISSIONS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: PERMISSIONS_CREATE_ITEM,
    url: `^${PERMISSIONS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: PERMISSIONS_DELETE_ITEMS,
    url: `^${PERMISSIONS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: PERMISSIONS_DELETE_ITEM,
    url: `^${PERMISSIONS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PUT',
    name: PERMISSIONS_REPLACE_ITEM,
    url: `^${PERMISSIONS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PATCH',
    name: PERMISSIONS_UPDATE_ITEM,
    url: `^${PERMISSIONS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
];

export default permissionsPermissions;
