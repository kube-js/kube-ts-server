import { ItemNotFoundError } from '@js-items/foundation';
import { Request } from 'express';
import User from '../../../../../types/items/User';
import UnauthorizedError from '../../../../../utils/errors/auth/UnauthorizedError';
import createExtractTokenFromRequest, {
  Extractor,
  TokenExtractorFactory,
} from '../../../../../utils/helpers/auth/createExtractTokenFromRequest';
import verifyToken from '../../../../../utils/helpers/auth/verifyToken';
import Config from '../../../presenterFactory/Config';

export interface Options {
  readonly req: Request;
  readonly config: Config;
  readonly tokenExtractorFactory?: TokenExtractorFactory;
  readonly extractors?: Extractor[];
}

const getAuthenticatedUser = async ({
  config,
  req,
  tokenExtractorFactory = createExtractTokenFromRequest,
  extractors,
}: Options): Promise<User> => {
  try {
    const tokenExtractor = tokenExtractorFactory({ extractors });

    const token = tokenExtractor({ req });

    const { secret } = config.appConfig.auth.jwt;

    const {
      data: { id },
    }: any = verifyToken({ token, secret });

    const { item } = await config.service.users.getItem({
      id,
    });

    return Promise.resolve(item);
  } catch (error) {
    if (error instanceof ItemNotFoundError) {
      throw new UnauthorizedError();
    }
    throw error;
  }
};

export default getAuthenticatedUser;
