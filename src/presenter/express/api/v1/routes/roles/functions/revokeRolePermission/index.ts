import { NO_CONTENT } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import Config from '../../../../../../presenterFactory/Config';
import getAuthenticatedUser from '../../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import catchErrors from '../../../../../../utils/errors/catchErrors';
import rules from '../../../../../../utils/schemas/roles/revokeRolePermission';

const revokeRolePermission = (config: Config) =>
  catchErrors(config, async (req, res) => {
    const user = await getAuthenticatedUser({ req, config });

    await hasPermission({ req, user, config });

    const { permission_id, role_id } = req.params;

    validateData(rules)({ role_id, permission_id });

    await config.service.revokeRolePermission({
      permissionId: permission_id,
      roleId: role_id,
    });

    res.status(NO_CONTENT);
  });

export default revokeRolePermission;
