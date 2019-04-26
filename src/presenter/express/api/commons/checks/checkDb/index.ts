import Config from '../../../../presenterFactory/Config';

export default async (config: Config) =>
  new Promise(async (resolve, reject) => {
    try {
      await config.service.users.countItems({});
      resolve();
    } catch (err) {
      reject(err);
    }
  });
