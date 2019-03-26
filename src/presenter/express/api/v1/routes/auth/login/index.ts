import { OK } from 'http-status-codes';
import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import String from 'rulr/String';
import validateData from 'rulr/validateData';
import { VARCHAR_LENGTH } from '../../../../../../../constants';
import Email from '../../../../../../../utils/validation/rules/Email';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';

const rules = Record({
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
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
