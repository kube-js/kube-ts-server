import { QUERY_REGEX, UUID_REGEX } from '../../../../../../constants';
import {
  COURSES_CREATE_ITEM,
  COURSES_DELETE_ITEM,
  COURSES_DELETE_ITEMS,
  COURSES_GET_ITEM,
  COURSES_GET_ITEMS,
  COURSES_REPLACE_ITEM,
  COURSES_UPDATE_ITEM,
} from '../../../../../../constants/permissions/courses';

export const COURSES_URL_REGEX = '(/api/v1/courses)';

const coursesPermissions = [
  {
    method: 'GET',
    name: COURSES_GET_ITEM,
    url: `^${COURSES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'GET',
    name: COURSES_GET_ITEMS,
    url: `^${COURSES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: COURSES_CREATE_ITEM,
    url: `^${COURSES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: COURSES_DELETE_ITEMS,
    url: `^${COURSES_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: COURSES_DELETE_ITEM,
    url: `^${COURSES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PUT',
    name: COURSES_REPLACE_ITEM,
    url: `^${COURSES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PATCH',
    name: COURSES_UPDATE_ITEM,
    url: `^${COURSES_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
];

export default coursesPermissions;
