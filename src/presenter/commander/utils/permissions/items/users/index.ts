import { QUERY_REGEX, UUID_REGEX } from '../../../../../../constants';
import {
  USERS_ASSIGN_ROLE,
  USERS_CREATE_ITEM,
  USERS_DELETE_ITEM,
  USERS_DELETE_ITEMS,
  USERS_GET_ITEM,
  USERS_GET_ITEMS,
  USERS_REPLACE_ITEM,
  USERS_REVOKE_ROLE,
  USERS_UPDATE_ITEM,
} from '../../../../../../constants/permissions';
// ^(/api/v1/users/){1}([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}){1}(\\?([a-z0-9$_.+!*{}"(),;:@&=-]|%[0-9a-f]{2})*)?$
export const USERS_URL_REGEX = '[/api/v1/users]{1}';
// ^(/api/v1/users/){1}([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}){1}$
const usersPermissions = [
  {
    method: 'GET',
    name: USERS_GET_ITEM,
    url: `^${USERS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'GET',
    name: USERS_GET_ITEMS,
    url: `^${USERS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: USERS_CREATE_ITEM,
    url: `^${USERS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: USERS_DELETE_ITEMS,
    url: `^${USERS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: USERS_DELETE_ITEM,
    url: `^${USERS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PUT',
    name: USERS_REPLACE_ITEM,
    url: `^${USERS_URL_REGEX}${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PATCH',
    name: USERS_UPDATE_ITEM,
    url: `^${USERS_URL_REGEX}/${UUID_REGEX}]${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: USERS_ASSIGN_ROLE,
    url: `^${USERS_URL_REGEX}/${UUID_REGEX}/roles${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: USERS_REVOKE_ROLE,
    url: `^${USERS_URL_REGEX}/${UUID_REGEX}/roles/${UUID_REGEX}${QUERY_REGEX}$`,
  },
];

export default usersPermissions;
