import Config from '../../../../presenterFactory/Config';

export default async (_config: Config) =>
  new Promise((resolve, _reject) => {
    // placeholder for db set up
    // and other services i.e. redis cache service
    resolve();
  });
