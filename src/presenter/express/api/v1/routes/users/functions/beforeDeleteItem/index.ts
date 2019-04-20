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

      // FYI: user should be able to delete itself without permission
      if (req.params.id !== user.id) {
      await hasPermission({ req, user, config });
      }
    },
    config,
  });

export default beforeDeleteItem;
