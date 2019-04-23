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
import { API_V1 } from '../../../../../../constants/routes';

const USERS_URL_REGEX = `[${API_V1}/users]`;

const usersPermissions = [
  {
    method: 'GET',
    name: USERS_GET_ITEM,
    url: `${USERS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}`,
  },
  {
    method: 'GET',
    name: USERS_GET_ITEMS,
    url: `${USERS_URL_REGEX}${QUERY_REGEX}`,
  },
  {
    method: 'POST',
    name: USERS_CREATE_ITEM,
    url: `${USERS_URL_REGEX}${QUERY_REGEX}`,
  },
  {
    method: 'DELETE',
    name: USERS_DELETE_ITEMS,
    url: `${USERS_URL_REGEX}${QUERY_REGEX}`,
  },
  {
    method: 'DELETE',
    name: USERS_DELETE_ITEM,
    url: `[${API_V1}/users/${UUID_REGEX}]${QUERY_REGEX}`,
  },
  {
    method: 'PUT',
    name: USERS_REPLACE_ITEM,
    url: `[${API_V1}/users/${UUID_REGEX}]${QUERY_REGEX}`,
  },
  {
    method: 'PATCH',
    name: USERS_UPDATE_ITEM,
    url: `[${API_V1}/users/${UUID_REGEX}]${QUERY_REGEX}`,
  },
  {
    method: 'POST',
    name: USERS_ASSIGN_ROLE,
    url: `[${API_V1}/users/${UUID_REGEX}/roles]${QUERY_REGEX}`,
  },
  {
    method: 'DELETE',
    name: USERS_REVOKE_ROLE,
    url: `[${API_V1}/users/${UUID_REGEX}/roles/${UUID_REGEX}]${QUERY_REGEX}`,
  },
];

export default usersPermissions;
