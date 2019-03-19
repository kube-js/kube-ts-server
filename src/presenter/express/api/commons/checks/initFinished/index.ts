import Config from '../../../../presenterFactory/Config';

export default (_config: Config) => async() =>
  new Promise((resolve, _reject) => {
    resolve();
  });
