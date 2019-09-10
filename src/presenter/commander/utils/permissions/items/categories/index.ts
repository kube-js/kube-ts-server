import { QUERY_REGEX, UUID_REGEX } from '../../../../../../constants';
import {
  CATEGORIES_CREATE_ITEM,
  CATEGORIES_DELETE_ITEM,
  CATEGORIES_DELETE_ITEMS,
  CATEGORIES_GET_ITEM,
  CATEGORIES_GET_ITEMS,
  CATEGORIES_REPLACE_ITEM,
  CATEGORIES_UPDATE_ITEM,
} from '../../../../../../constants/permissions/categories';

export const CATEGORIES_URL_REGEX = '(/api/v1/categories)';

const coursesPermissions = [
  {
    method: 'GET',
    name: CATEGORIES_GET_ITEM,
    url: `^${CATEGORIES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'GET',
    name: CATEGORIES_GET_ITEMS,
    url: `^${CATEGORIES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: CATEGORIES_CREATE_ITEM,
    url: `^${CATEGORIES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: CATEGORIES_DELETE_ITEMS,
    url: `^${CATEGORIES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: CATEGORIES_DELETE_ITEM,
    url: `^${CATEGORIES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PUT',
    name: CATEGORIES_REPLACE_ITEM,
    url: `^${CATEGORIES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PATCH',
    name: CATEGORIES_UPDATE_ITEM,
    url: `^${CATEGORIES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
];

export default coursesPermissions;
