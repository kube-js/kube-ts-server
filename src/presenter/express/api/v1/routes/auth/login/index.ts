import { OK } from 'http-status-codes';
import Record from 'rulr/Record';
import String from 'rulr/String';
import validateData from 'rulr/validateData';
import { VARCHAR_LENGTH } from '../../../../../../../constants';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';

const rules = Record({
  email: String(0, VARCHAR_LENGTH),
  password: String(0, VARCHAR_LENGTH),
});

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email, password } = req.body;

    validateData(rules)({ email, password });

    const { user, token } = await config.service.auth.login({
      email,
      password,
    });

    res.status(OK).json({
      token,
      user,
    });
  });
