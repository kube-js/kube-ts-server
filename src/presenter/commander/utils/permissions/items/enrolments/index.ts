import { QUERY_REGEX, UUID_REGEX } from '../../../../../../constants';
import {
  ENROLMENTS_CREATE_ITEM,
  ENROLMENTS_DELETE_ITEM,
  ENROLMENTS_DELETE_ITEMS,
  ENROLMENTS_GET_ITEM,
  ENROLMENTS_GET_ITEMS,
  ENROLMENTS_REPLACE_ITEM,
  ENROLMENTS_UPDATE_ITEM,
} from '../../../../../../constants/permissions';

export const ENROLMENTS_URL_REGEX = '(/api/v1/enrolments)';


const enrolmentsPermissions = [
  {
    method: 'GET',
    name: ENROLMENTS_GET_ITEM,
    url: `^${ENROLMENTS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'GET',
    name: ENROLMENTS_GET_ITEMS,
    url: `^${ENROLMENTS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'POST',
    name: ENROLMENTS_CREATE_ITEM,
    url: `^${ENROLMENTS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: ENROLMENTS_DELETE_ITEMS,
    url: `^${ENROLMENTS_URL_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'DELETE',
    name: ENROLMENTS_DELETE_ITEM,
    url: `^${ENROLMENTS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PUT',
    name: ENROLMENTS_REPLACE_ITEM,
    url: `^${ENROLMENTS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
  {
    method: 'PATCH',
    name: ENROLMENTS_UPDATE_ITEM,
    url: `^${ENROLMENTS_URL_REGEX}/${UUID_REGEX}${QUERY_REGEX}$`,
  },
];

export default enrolmentsPermissions;
