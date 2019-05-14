import { CREATED } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import getAuthenticatedUser from '../../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import catchErrors from '../../../../../../utils/errors/catchErrors';
import rules from '../../../../../../utils/schemas/roles/assignRolePermission';
import { BaseFactoryConfig } from '../../../utils/baseFactory';

const assignRolePermission = (config: BaseFactoryConfig) =>
  catchErrors(config, async (req, res) => {
    const user = await getAuthenticatedUser({ req, config });

    await hasPermission({ req, user, config });

    const { role_id } = req.params;
    const { permission_id } = req.body;

    validateData(rules)({ role_id, permission_id });

    await config.service.assignRolePermission({
      permissionId: permission_id,
      roleId: role_id,
    });

    const translations = config.translator({ req });

    res.status(CREATED).json({
      message: translations.created(),
    });
  });

export default assignRolePermission;
