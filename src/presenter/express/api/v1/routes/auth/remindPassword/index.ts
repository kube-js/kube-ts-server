import { ItemNotFoundError } from '@js-items/foundation';
import { OK } from 'http-status-codes';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import RemindPasswordError from '../../../../../../../utils/errors/auth/RemindPasswordError';
import getResetPasswordUrl from '../../../../../../../utils/helpers/url/getResetPasswordUrl';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';
import rules from '../../../../../utils/schemas/auth/remindPassword';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email } = req.body;

    validateData(rules)({ email });

    const { appConfig, service, translator } = config;

    const translations = translator({ req });

    const remindPasswordToken = uuid();

    try {
      const link = getResetPasswordUrl({
        config: appConfig.http.client,
        email,
        token: remindPasswordToken,
      });

      const mailOptions = {
        from: appConfig.repo.mail.from,
        html: translations.remindPasswordHtml(link),
        subject: translations.remindPasswordSubject(),
        text: translations.remindPasswordText(link),
        to: email,
      };

      await service.auth.remindPassword({
        email,
        mailOptions,
        remindPasswordToken,
      });

      const message = translations.resetPasswordLinkSent();

      res.status(OK).json({ message });
    } catch (error) {
      if (error instanceof ItemNotFoundError) {
        throw new RemindPasswordError(email);
      }
      throw error;
    }
  });
