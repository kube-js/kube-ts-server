import { ConflictingItemError } from '@js-items/foundation';
import _isNil from 'ramda/src/isNil';
import _pluck from 'ramda/src/pluck';
import { v4 as uuid } from 'uuid';
import { STUDENT } from '../../../../constants/roles';
import { Options as MailOptions } from '../../../../repo/mail/nodemailer/functions/sendEmail';
import { GenderType } from '../../../../types/items/User';
import ConflictError from '../../../../utils/errors/http/ConflictError';
import hashPassword from '../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';
import Config from '../../../FactoryConfig';
import getRolesForUser from '../utils/getRolesForUser';

export interface Options {
  readonly bio: string;
  readonly dateOfBirth: string;
  readonly email: string;
  readonly firstName: string;
  readonly gender: GenderType;
  readonly lastName: string;
  readonly password: string;
  readonly mailOptions: MailOptions;
  readonly verifyToken: string;
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
  verifyToken,
}: Options) => {
  try {
    const id = uuid();
    const roleId = uuid();
    const userRoleId = uuid();

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
        verifyToken,
      },
    });

    const { item: insertedUser } = await repo.users.getItem({
      id,
    });

    const { item: studentRole } = await repo.roles.createItem({
      id: roleId,
      item: {
        createdAt: getUtcDate(),
        id,
        name: STUDENT,
      },
    });

    await repo.userRole.createItem({
      id: userRoleId,
      item: {
        createdAt: getUtcDate(),
        id: userRoleId,
        roleId: studentRole.id,
        userId: insertedUser.id,
      },
    });

    const roles = await getRolesForUser({ repo, userId: id });

    await repo.sendEmail(mailOptions);

    return Promise.resolve({
      roles,
      user: insertedUser,
    });
  } catch (error) {
    if (error instanceof ConflictingItemError) {
      throw new ConflictError(error.itemName, error.itemId);
    }

    throw error;
  }
};
