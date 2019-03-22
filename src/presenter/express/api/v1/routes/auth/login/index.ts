import { OK } from 'http-status-codes';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/catchErrors';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email, password } = req.body;

    // TODO: validation

    const { user, token } = await config.service.auth.login({
      email,
      password,
    });

    res.status(OK).json({
      token,
      user,
    });
  });
