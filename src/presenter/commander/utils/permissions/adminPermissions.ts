import { API_V1 } from '../../../../constants/routes';

const QUERY_REGEX = "[?([a-z0-9$_.+!*'(),;:@&=-]|%[0-9a-f]{2})*]";
const USERS_URL = `[${API_V1}/users]`;

export const usersPermissions = [
  {
    method: 'POST',
    name: 'users.createItem',
    url: `${USERS_URL}${QUERY_REGEX}`,
  },
  {
    method: 'GET',
    name: 'users.getItems',
    url: `${USERS_URL}${QUERY_REGEX}`,
  },
  {
    method: 'DELETE',
    name: 'users.deleteItems',
    url: `${USERS_URL}${QUERY_REGEX}`,
  },
  // {
  //   method: 'DELETE',
  //   name: 'users.deleteItem',
  //   url: `${API_V1}/users/${QUERY_REGEX}`,
  // },
  // {
  //   method: 'POST',
  //   name: 'users.create',
  //   url: '/users',
  // },
];

const adminPermissions = [...usersPermissions];

export default adminPermissions;
