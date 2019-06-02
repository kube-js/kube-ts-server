import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import getAuthenticatedUser from '../../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../../utils/handlers/transactionWrapper';
import rules, {
  beforeCreateSchema,
} from '../../../../../../utils/schemas/enrolments/createItem';
import { BaseFactoryConfig } from '../../../utils/baseFactory';

const defaultTransactionHandler = (config: BaseFactoryConfig) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthenticatedUser({ req, config });

      await hasPermission({ req, user, config });

      const payload: any = _pick(Object.keys(beforeCreateSchema), req.body);

      validateData(rules)(payload);

      req.body.user_id = user.id;
    },
    config,
  });

export default defaultTransactionHandler;
