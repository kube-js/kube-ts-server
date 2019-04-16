import { OK } from 'http-status-codes';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';
import rules from '../../../../../utils/schemas/auth/verifyAccount';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email, token } = req.body;

    validateData(rules)({ email, token });

    const { translator } = config;

    const translations = translator({ req });

    await config.service.auth.verifyAccount({
      email,
      token,
    });

    const message = translations.accountVerifiedSuccessfully();

    res.status(OK).json({ message });
  });
