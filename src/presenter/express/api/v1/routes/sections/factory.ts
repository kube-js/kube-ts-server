import _pick from 'ramda/src/pick';
import Section from '../../../../../../types/items/Section';
import Config from '../../../../presenterFactory/Config';
import beforeCreateRules, {
  beforeCreateSchema,
} from '../../../../utils/schemas/sections/createItem';
import beforeReplaceRules, {
  beforeReplaceSchema,
} from '../../../../utils/schemas/sections/replaceItem';
import beforeUpdateRules, {
  beforeUpdateSchema,
} from '../../../../utils/schemas/sections/updateItem';
import baseFactory from '../utils/baseFactory';
import beforeCreateItem from './functions/beforeCreateItem';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';

const sectionsFactory = (config: Config) => {
  const enhancedConfig = {
    ...config,
    beforeCreateRules,
    beforeCreateSchema,
    beforeReplaceRules,
    beforeReplaceSchema,
    beforeUpdateRules,
    beforeUpdateSchema,
  };
  const router = baseFactory<Section>({
    config: enhancedConfig,
    factoryConfig: {
      beforeCreateItem: beforeCreateItem(enhancedConfig),
      convertDocumentIntoItem: convertDocumentIntoItem(enhancedConfig),
    },
    service: config.service.sections,
  });

  return router;
};

export default sectionsFactory;
