// tslint:disable:no-console
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import commanderMigrationsPresenterFactory from '@js-migrations/commander/dist/factory';
import defaultLog from '@js-migrations/commander/dist/utils/defaultLog';
import handleMigrationError from '@js-migrations/commander/dist/utils/handleError';
import dbSeed from '../functions/dbSeed';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig) => {
  const { program, service } = factoryConfig;

  commanderMigrationsPresenterFactory({
    handleError: err => {
      handleMigrationError(err, (message: string, ...args: any[]) => {
        // tslint:disable-next-line:no-console
        console.error(message, args);
      });
    },
    log: status => {
      defaultLog(status, message => {
        // tslint:disable-next-line:no-console
        console.log(status, message);
      });
    },
    program,
    service: service.migrations,
  });

  program
    .command('seed')
    .description('Seeds database with initial data')
    .action(dbSeed(factoryConfig));
};
