import { Router } from 'express';
import loggerFactory from '../../../logger/factory';
import repoFactory from '../../../repo/factory';
import serviceFactory from '../../../service/factory';
import translatorFactory from '../../../translator/factory';
import presenterFactory from '../presenterFactory';
import Config from './Config';

export default (globalConfig: Config): Router => {
  const repo = repoFactory(globalConfig.repo);

  const logger = loggerFactory(globalConfig.logger);

  const service = serviceFactory({ logger, repo, globalConfig });

  const translator = translatorFactory(globalConfig.translator);

  const presenter = presenterFactory({
    globalConfig,
    service,
    translator,
  });

  return presenter;
};
