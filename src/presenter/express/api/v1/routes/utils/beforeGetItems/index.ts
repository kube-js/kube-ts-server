import Config from '../../../../../presenterFactory/Config';
import transactionWrapper from '../../../../../utils/handlers/transactionWrapper';

const beforeGetItems = (config: Config) =>
  transactionWrapper({
    // GET ITEM DO NOT REQUIRE AUTHENTICATION AND AUTHORISATION BY DEFAULT
    beforeHandler: async () => Promise.resolve({}),
    config,
  });

export default beforeGetItems;
