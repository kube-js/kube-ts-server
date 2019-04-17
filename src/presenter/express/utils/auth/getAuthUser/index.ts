import { Request } from 'express';
import User from '../../../../../types/items/User';

export interface Options {
  readonly req: Request;
}

const getAuthUser = async ({  }: Options): Promise<User> =>
  // tslint:disable-next-line:no-object-literal-type-assertion
  Promise.resolve({} as User);

export default getAuthUser;
