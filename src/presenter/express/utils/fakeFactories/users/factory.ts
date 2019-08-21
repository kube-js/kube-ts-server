// tslint:disable:no-magic-numbers
import faker from 'faker';
import User from '../../../../../types/items/User';
import hashPassword from '../../../../../utils/helpers/auth/hashPassword';
import { TEST_UUID } from '../../tests/testData';
import baseFactory, { Options } from '../index';

const constantDate = new Date('2019-03-27T21:32:31.000Z');

const createUserItemData = async () => ({
  accountLockoutExpiresAt: null,
  bio: faker.lorem.sentences(10),
  dateOfBirth: faker.date.past(50),
  email: faker.internet.exampleEmail(),
  firstName: faker.name.firstName(),
  gender: Math.random() > 0.5 ? 'male' : 'female',
  lastName: faker.name.lastName(),
  loginLastAttemptAt: constantDate,
  password: await hashPassword(faker.internet.password()),
  verifiedAt: constantDate,
  verifyToken: TEST_UUID,
});

const usersFactory = async (options: Options<User>) => {
  const itemData = await createUserItemData();

  return baseFactory<User>(itemData as Partial<User>)(options);
};

export default usersFactory;
