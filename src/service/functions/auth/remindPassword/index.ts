import { ConflictingItemError } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import { DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES } from '../../../../constants';
import { Options as MailOptions } from '../../../../repo/mail/nodemailer/functions/sendEmail';
import RemindPasswordError from '../../../../utils/errors/auth/RemindPasswordError';
import ConflictError from '../../../../utils/errors/http/ConflictError';
import fastForwardTimeBy from '../../../../utils/helpers/date/fastForwardTimeBy';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly email: string;
  readonly mailOptions: MailOptions;
  readonly token: string;
}

export default ({ repo }: Config) => async ({
  email,
  mailOptions,
  token,
}: Options) => {
  try {
    const { items } = await repo.users.getItems({
      filter: {
        email,
      },
    });

    if (items.length === 0) {
      throw new RemindPasswordError(email);
    }

    const user = items[0];

    await repo.resetPasswordTokens.createItem({
      id: token,
      item: {
        createdAt: getUtcDate(),
        expiresAt: fastForwardTimeBy(DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES, 'minutes'),
        id: token,
        userId: user.id,
      },
    });

    await repo.sendEmail(mailOptions);

  } catch (error) {
    if (error instanceof ConflictingItemError) {
      throw new ConflictError(error.itemName, error.itemId);
    }

    throw error;
  }
};
