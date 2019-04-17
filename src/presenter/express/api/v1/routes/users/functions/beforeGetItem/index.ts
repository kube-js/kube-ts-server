import Config from '../../../../../../presenterFactory/Config';
import getAuthUser from '../../../../../../utils/auth/getAuthUser';
import transactionWrapper, {
  HookOptions,
} from '../../../../../../utils/handlers/transactionWrapper';

const beforeGetItem = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      await getAuthUser({ req });
    },
    config,
  });

export default beforeGetItem;
