import { API_V1 } from '../../../../constants/routes';

const QUERY_REGEX = '[?.*]?';

export const usersPermissions = [
  {
    method: 'POST',
    name: 'users.createItem',
    url: `${API_V1}/users${QUERY_REGEX}`,
  },
  {
    method: 'GET',
    name: 'users.getItems',
    url: `${API_V1}/users${QUERY_REGEX}`,
  },
  {
    method: 'DELETE',
    name: 'users.deleteItems',
    url: `${API_V1}/users/${QUERY_REGEX}`,
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
