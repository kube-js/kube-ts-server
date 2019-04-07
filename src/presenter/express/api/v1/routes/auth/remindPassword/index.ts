import { ItemNotFoundError } from '@js-items/foundation';
import { OK } from 'http-status-codes';
import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import String from 'rulr/String';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import { VARCHAR_LENGTH } from '../../../../../../../constants';
import RemindPasswordError from '../../../../../../../utils/errors/auth/RemindPasswordError';
import getResetPasswordUrl from '../../../../../../../utils/helpers/url/getResetPasswordUrl';
import Email from '../../../../../../../utils/validation/rules/Email';
import Config from '../../../../../presenterFactory/Config';
import catchErrors from '../../../../../utils/errors/catchErrors';

const rules = Record({
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
});

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const { email } = req.body;

    validateData(rules)({ email });

    const { appConfig, service, translator } = config;

    const translations = translator({ req });

    const resetPasswordToken = uuid();

    try {
      const link = getResetPasswordUrl({
        config: appConfig.http.client,
        email,
        token: resetPasswordToken,
      });

      const mailOptions = {
        from: appConfig.repo.mail.from,
        html: translations.resetPasswordHtml(link),
        subject: translations.resetPasswordSubject(),
        text: translations.resetPasswordText(link),
        to: email,
      };

      await service.auth.remindPassword({ email, mailOptions, resetPasswordToken });

      const message = translations.resetPasswordLinkSent();

      res.status(OK).json({ message });
    } catch (error) {
      if (error instanceof ItemNotFoundError) {
        throw new RemindPasswordError(email);
      }
      throw error;
    }
  });
