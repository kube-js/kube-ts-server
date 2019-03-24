import loggerFactory from '../../../logger/factory';
import repoFactory from '../../../repo/factory';
import serviceFactory from '../../../service/factory';
import presenterFactory from '../presenterFactory/factory';
import AppConfig from './AppConfig';

export default (appConfig: AppConfig) => {
  const repo = repoFactory(appConfig.repo);

  const logger = loggerFactory(appConfig.logger);

  const service = serviceFactory({ repo, logger, appConfig });

  presenterFactory({ service, program: appConfig.program, logger });
};
