import { OK } from 'http-status-codes';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import getVerifyEmailUrl from '../../../../../../../utils/helpers/url/getVerifyEmailUrl';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';
import rules from '../../../../../utils/schemas/auth/resendVerifyToken';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email } = req.body;

    validateData(rules)({ email });

    const { appConfig, translator } = config;

    const translations = translator({ req });

    const verifyToken = uuid();

    const link = getVerifyEmailUrl({
      config: appConfig.http.client,
      email,
      token: verifyToken,
    });

    const mailOptions = {
      from: appConfig.repo.mail.from,
      html: translations.verifyYourEmailHtml(link),
      subject: translations.verifyYourEmailSubject(),
      text: translations.verifyYourEmailText(link),
      to: email,
    };

    await config.service.auth.resendVerifyToken({
      email,
      mailOptions,
    });

    const message = translations.verifyTokenSent();

    res.status(OK).json({ message });
  });
