import pick from 'ramda/src/pick';
import User from '../../../../types/items/User';

export default (user: User): Partial<User> =>
  pick(
    [
      'id',
      'email',
      'avatar',
      'firstName',
      'lastName',
      'bio',
      'dateOfBirth',
      'gender',
    ],
    user
  );
