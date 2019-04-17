import { Request } from 'express';
import User from '../../../../../types/items/User';

export interface Options {
  readonly req: Request;
  readonly user: User;
}

const hasPermission = async ({  }: Options) => Promise.resolve();

export default hasPermission;
