import pick from 'ramda/src/pick';
import User from '../../../../types/items/User';

export default (user: User): Partial<User> =>
  pick(
    [
      'email',
      'password',
      'firstName',
      'lastName',
      'bio',
      'age',
      'gender',
      'verifiedAt',
      'loginLastAttemptAt',
    ],
    user
  );
