import { Router } from 'express';
import loggerFactory from '../../../logger/factory';
import repoFactory from '../../../repo/factory';
import serviceFactory from '../../../service/factory';
import translatorFactory from '../../../translator/factory';
import presenterFactory from '../presenterFactory';
import AppConfig from './AppConfig';

export interface App {
  readonly presenter: Router;
  readonly service: ReturnType<typeof serviceFactory>;
}

export default (appConfig: AppConfig): App => {
  const repo = repoFactory(appConfig.repo);

  const logger = loggerFactory(appConfig.logger);

  const translator = translatorFactory(appConfig.translator);
  
  const service = serviceFactory({ logger, repo, appConfig });

  const presenter = presenterFactory({
    appConfig,
    service,
    translator,
  });

  return { presenter, service };
};
