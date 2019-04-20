import { CREATED } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import Config from '../../../../../../presenterFactory/Config';
import getAuthenticatedUser from '../../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import catchErrors from '../../../../../../utils/errors/catchErrors';
import rules from '../../../../../../utils/schemas/users/assignUserRole';

const assignUserRole = (config: Config) =>
  catchErrors(config, async (req, res) => {
    const user = await getAuthenticatedUser({ req, config });

    await hasPermission({ req, user, config });

    const { user_id } = req.params;
    const { role_id } = req.body;

    validateData(rules)({ user_id, role_id });

    await config.service.assignUserRole({
      roleId: role_id,
      userId: user_id,
    });

    const translations = config.translator({ req });

    res.status(CREATED).json({
      message: translations.created(),
    });
  });

export default assignUserRole;
