import _isNil from 'ramda/src/isNil';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import getUtcDate from '../../../../../../../utils/helpers/date/getUtcDate';
import getAuthenticatedUser from '../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../utils/handlers/transactionWrapper';
import { BaseFactoryConfig } from '../baseFactory';

const beforeReplaceItem = (config: BaseFactoryConfig) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthenticatedUser({ req, config });

      if (req.params.id !== user.id) {
        await hasPermission({ req, user, config });
      }

      const payload: any = _pick(Object.keys(config.beforeReplaceSchema), req.body);

      validateData(config.beforeReplaceRules)(payload);

      req.body.updatedAt = getUtcDate();
    },
    config,
  });

export default beforeReplaceItem;
