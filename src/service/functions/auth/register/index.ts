import { ConflictingItemError } from '@js-items/foundation';
import moment from 'moment';
import _isNil from 'ramda/src/isNil';
import { v4 as uuid } from 'uuid';
import { GenderType } from '../../../../types/items/User';
import ConflictError from '../../../../utils/errors/http/ConflictError';
import Config from '../../../FactoryConfig';

export interface MailOptions {
  readonly from: string;
  readonly html: string;
  readonly subject: string;
  readonly text: string;
  readonly to: string;
  readonly verifyToken: string;
}

export interface Options {
  readonly bio: string;
  readonly dateOfBirth: string;
  readonly email: string;
  readonly firstName: string;
  readonly gender: GenderType;
  readonly lastName: string;
  readonly password: string;
  readonly mailOptions: MailOptions;
}

export default ({ repo }: Config) => async ({
  bio,
  dateOfBirth,
  email,
  firstName,
  gender,
  lastName,
  password,
  mailOptions,
}: Options) => {
  try {
    const id = uuid();

    const { item } = await repo.users.createItem({
      id,
      item: {
        bio,
        createdAt: new Date(),
        dateOfBirth: moment(dateOfBirth).toDate(),
        email,
        firstName,
        gender,
        id,
        lastName,
        password,
      },
    });

    /*  TODO: move that to remind password */
    // await repo.resetPasswordTokens.createItem({
    //   id: mailOptions.verifyToken,
    //   item: {
    //     createdAt: new Date(),
    //     expiresAt: moment()
    //       .add(DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES, 'minutes')
    //       .toDate(),
    //     id: mailOptions.verifyToken,
    //     userId: item.id,
    //   },
    // });

    await repo.sendEmail(mailOptions);

    return Promise.resolve(item);
  } catch (error) {
    if (error instanceof ConflictingItemError) {
      throw new ConflictError(error.itemName, error.itemId);
    }
    
    throw error;
  }
};
