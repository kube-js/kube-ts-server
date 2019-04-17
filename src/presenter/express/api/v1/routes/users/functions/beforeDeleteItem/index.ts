import Config from '../../../../../../presenterFactory/Config';
import getAuthUser from '../../../../../../utils/auth/getAuthUser';
import hasPermission from '../../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../../utils/handlers/transactionWrapper';

const beforeDeleteItem = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthUser({ req });

      await hasPermission({ req, user });
    },
    config,
  });

export default beforeDeleteItem;
