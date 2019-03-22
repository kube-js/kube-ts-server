import { Router } from 'express';
import loggerFactory from '../../../logger/factory';
import repoFactory from '../../../repo/factory';
import serviceFactory from '../../../service/factory';
import translatorFactory from '../../../translator/factory';
import presenterFactory from '../presenterFactory';
import Config from './Config';

export default (config: Config): Router => {
  const repo = repoFactory(config.repo);

  const logger = loggerFactory(config.logger);

  const service = serviceFactory({ logger, repo });

  const translator = translatorFactory(config.translator);

  const presenter = presenterFactory({
    globalConfig: config,
    service,
    translator,
  });

  return presenter;
};
