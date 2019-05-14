import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import getAuthenticatedUser from '../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../utils/handlers/transactionWrapper';
import { BaseFactoryConfig } from '../baseFactory';

const defaultTransactionHandler = (config: BaseFactoryConfig) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthenticatedUser({ req, config });

      await hasPermission({ req, user, config });

      const payload: any = _pick(Object.keys(config.beforeCreateSchema), req.body);

      validateData(config.beforeCreateRules)(payload);
    },
    config,
  });

export default defaultTransactionHandler;
