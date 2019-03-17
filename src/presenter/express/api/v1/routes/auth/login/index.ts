import { OK } from 'http-status-codes';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/catchErrors';

export default (config: Config) =>
  catchErrors(config, async (_req, res) => {
    res.status(OK).json({
      token: 'token',
      user: {},
    });
  });
