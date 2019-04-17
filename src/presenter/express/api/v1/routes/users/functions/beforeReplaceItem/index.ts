import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import hashPassword from '../../../../../../../../utils/helpers/auth/hashPassword';
import rules, {
  schema,
} from '../../../../../../../express/utils/schemas/users/createItem';
import Config from '../../../../../../presenterFactory/Config';
import transactionWrapper, {
  HookOptions,
} from '../../../../../../utils/handlers/transactionWrapper';

const beforeReplaceItem = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const payload: any = _pick(Object.keys(schema), req.body);

      validateData(rules)(payload);

      req.body.password = !_isNil(req.body.password) ?  await hashPassword(req.body.password) : undefined;
    },
    config,
  });

export default beforeReplaceItem;
