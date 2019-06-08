import Config from '../../../../presenterFactory/Config';

export default async (config: Config) =>
  new Promise(async (resolve, reject) => {
    try {
      // FYI: simple check to see if db is ok
      await config.service.users.countItems({});
      resolve();
    } catch (err) {
      reject(err);
    }
  });
