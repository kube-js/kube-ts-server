import { ConflictingItemError } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import { v4 as uuid } from 'uuid';
import { GenderType } from '../../../../types/items/User';
import ConflictError from '../../../../utils/errors/http/ConflictError';
import hashPassword from '../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
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

    await repo.users.createItem({
      id,
      item: {
        bio,
        createdAt: getUtcDate(),
        dateOfBirth: getUtcDate(dateOfBirth, 'YYYY-MM-DD'),
        email,
        firstName,
        gender,
        id,
        lastName,
        password: await hashPassword(password),
      },
    });

    const { item: insertedItem } = await repo.users.getItem({
      id,
    });

    await repo.sendEmail(mailOptions);

    return Promise.resolve(insertedItem);
  } catch (error) {
    if (error instanceof ConflictingItemError) {
      throw new ConflictError(error.itemName, error.itemId);
    }

    throw error;
  }
};
