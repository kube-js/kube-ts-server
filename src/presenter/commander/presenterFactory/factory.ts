import commanderMigrationsPresenterFactory from '@js-migrations/commander/dist/factory';
import defaultLog from '@js-migrations/commander/dist/utils/defaultLog';
import handleMigrationError from '@js-migrations/commander/dist/utils/handleError';
import FactoryConfig from './FactoryConfig';

export default ({ program, service }: FactoryConfig) => {
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
};
