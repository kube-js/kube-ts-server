import { ItemNotFoundError } from '@js-items/foundation';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import authConfig from '../../../../config/subconfigs/auth';
import serviceFactory from '../../../../service/factory';
import User from '../../../../types/items/User';
import ExpiredJwtTokenError from '../../../errors/auth/ExpiredJwtTokenError';
import InvalidJwtTokenError from '../../../errors/auth/InvalidJwtTokenError';
import UnauthorizedError from '../../../errors/auth/UnauthorizedError';
import createExtractTokenFromRequest, {
  ExtractTokenFromRequest,
} from '../createExtractTokenFromRequest';
import verifyToken from '../verifyToken';

interface Options {
  readonly req: Request;
  readonly extractTokenFromRequest?: ExtractTokenFromRequest;
  readonly service: ReturnType<typeof serviceFactory>;
  readonly secret?: string | Buffer;
}

interface AuthData {
  readonly user: Partial<User>;
  // readonly permissions: string[];
}

const defaultExtractTokenFromRequest = createExtractTokenFromRequest();

export default async ({
  req,
  service,
  extractTokenFromRequest = defaultExtractTokenFromRequest,
  secret = authConfig.jwt.secret,
}: Options): Promise<AuthData> =>
  new Promise(async (resolve, reject) => {
    try {
      const token: string = extractTokenFromRequest({ req });

      const {
        data: { id },
      }: any = verifyToken({ token, secret });

      const { item } = await service.users.getItem({ id });

      resolve({ user: item });
    } catch (err) {
      reject(err);
    }
  });
