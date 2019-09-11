import pick from 'ramda/src/pick';
import User from '../../../../types/items/User';

export default (user: User): Partial<User> =>
  pick(
    [
      'createdAt',
      'updatedAt',
      'id',
      'email',
      'avatarUrl',
      'firstName',
      'lastName',
      'bio',
      'dateOfBirth',
      'gender',
      'verifiedAt',
      'loginLastAttemptAt',
      'verifyLastAttemptAt'
    ],
    user
  );
