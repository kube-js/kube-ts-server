import User from '../../../../types/items/User';
import Config from '../../../FactoryConfig';

export interface Options {
  readonly email: string;
  readonly password: string;
}

export default ({ repo }: Config) => async ({ email, password }: Options) => {
  const { items } = await repo.users.getItems({
    filter: {
      email,
    },
  });

  const user: User | undefined = items[0];

  if (user === undefined) {
    // TODO:
    // log that into logstash?
    // make a custom error
    throw new Error('Invalid credentials');
  }
};
