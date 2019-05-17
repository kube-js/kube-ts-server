import _pick from 'ramda/src/pick';
import Course from '../../../../../../types/items/Course';
import Config from '../../../../presenterFactory/Config';
import beforeCreateRules, {
  beforeCreateSchema,
} from '../../../../utils/schemas/courses/createItem';
import beforeReplaceRules, {
  beforeReplaceSchema,
} from '../../../../utils/schemas/courses/replaceItem';
import beforeUpdateRules, {
  beforeUpdateSchema,
} from '../../../../utils/schemas/courses/updateItem';
import baseFactory from '../utils/baseFactory';
import beforeCreateItem from './functions/beforeCreateItem';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';

const coursesFactory = (config: Config) => {
  const enhancedConfig = {
    ...config,
    beforeCreateRules,
    beforeCreateSchema,
    beforeReplaceRules,
    beforeReplaceSchema,
    beforeUpdateRules,
    beforeUpdateSchema,
  };
  const router = baseFactory<Course>({
    config: enhancedConfig,
    factoryConfig: {
      beforeCreateItem: beforeCreateItem(enhancedConfig),
      convertDocumentIntoItem: convertDocumentIntoItem(enhancedConfig),
    },
    service: config.service.courses,
  });

  return router;
};

export default coursesFactory;
