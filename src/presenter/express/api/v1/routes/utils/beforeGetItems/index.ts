import Config from '../../../../../presenterFactory/Config';
import getAuthenticatedUser from '../../../../../utils/auth/getAuthenticatedUser';
import hasPermission from '../../../../../utils/auth/hasPermission';
import transactionWrapper, {
  HookOptions,
} from '../../../../../utils/handlers/transactionWrapper';

const beforeGetItems = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const user = await getAuthenticatedUser({ req, config });

      await hasPermission({ req, user, config });
    },
    config,
  });

export default beforeGetItems;
