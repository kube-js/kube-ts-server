import Config from '../../../../../presenterFactory/Config';
import getAuthenticatedUser from '../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../utils/handlers/transactionWrapper';

const beforeDeleteItem = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthenticatedUser({ req, config });

      // FYI: user should be able to delete itself without permission
      if (req.params.id !== user.id) {
        await hasPermission({ req, user, config });
      }
    },
    config,
  });

export default beforeDeleteItem;
