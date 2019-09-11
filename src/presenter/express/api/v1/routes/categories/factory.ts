import _pick from 'ramda/src/pick';
import Category from '../../../../../../types/items/Category';
import Config from '../../../../presenterFactory/Config';
import beforeCreateRules, {
  beforeCreateSchema,
} from '../../../../utils/schemas/categories/createItem';
import beforeReplaceRules, {
  beforeReplaceSchema,
} from '../../../../utils/schemas/categories/replaceItem';
import beforeUpdateRules, {
  beforeUpdateSchema,
} from '../../../../utils/schemas/categories/updateItem';
import baseFactory from '../utils/baseFactory';
import beforeCreateItem from './functions/beforeCreateItem';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';

const categoriesFactory = (config: Config) => {
  const enhancedConfig = {
    ...config,
    beforeCreateRules,
    beforeCreateSchema,
    beforeReplaceRules,
    beforeReplaceSchema,
    beforeUpdateRules,
    beforeUpdateSchema,
  };
  const router = baseFactory<Category>({
    config: enhancedConfig,
    factoryConfig: {
      beforeCreateItem: beforeCreateItem(enhancedConfig),
      convertDocumentIntoItem: convertDocumentIntoItem(enhancedConfig),
    },
    service: config.service.categories,
  });

  return router;
};

export default categoriesFactory;
