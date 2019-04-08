import { OK } from 'http-status-codes';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';
import rules, { schema } from '../../../../../utils/schemas/auth/resetPassword';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const payload: any = _pick(Object.keys(schema), req.body);

    const { email, token, password } = validateData(rules)(payload);
    const { appConfig, translator } = config;

    const translations = translator({ req });

    const mailOptions = {
      from: appConfig.repo.mail.from,
      html: translations.resetPasswordHtml(),
      subject: translations.resetPasswordSubject(),
      text: translations.resetPasswordText(),
      to: email,
    };

    await config.service.auth.resetPassword({
      email,
      mailOptions,
      password,
      token,
    });

    const message = translations.passwordChangedSuccessfully();

    res.status(OK).json({ message });
  });
