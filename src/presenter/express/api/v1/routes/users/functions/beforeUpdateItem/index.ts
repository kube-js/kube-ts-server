import _isNil from 'ramda/src/isNil';
import hashPassword from '../../../../../../../../utils/helpers/auth/hashPassword';
import Config from '../../../../../../presenterFactory/Config';
import getAuthUser from '../../../../../../utils/auth/getAuthUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../../utils/handlers/transactionWrapper';

const beforeUpdateItem = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthUser({ req });

      await hasPermission({ req, user });

      req.body.password = !_isNil(req.body.password) ?  await hashPassword(req.body.password) : undefined;
    },
    config,
  });

export default beforeUpdateItem;
