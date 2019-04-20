import { NO_CONTENT } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import Config from '../../../../../../presenterFactory/Config';
import getAuthenticatedUser from '../../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import catchErrors from '../../../../../../utils/errors/catchErrors';
import rules from '../../../../../../utils/schemas/users/assignUserRole';

const revokeUserRole = (config: Config) =>
  catchErrors(config, async (req, res) => {
    const user = await getAuthenticatedUser({ req, config });

    await hasPermission({ req, user, config });

    const { user_id, role_id } = req.params;

    validateData(rules)({ user_id, role_id });

    await config.service.revokeUserRole({
      roleId: role_id,
      userId: user_id,
    });

    res.status(NO_CONTENT);
  });

export default revokeUserRole;
