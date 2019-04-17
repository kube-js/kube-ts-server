import TransactionHandler from '@js-items/express/dist/types/TransactionHandler';
import { ConflictingItemError } from '@js-items/foundation';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import ConflictError from '../../../../../utils/errors/http/ConflictError';
import Config from '../../../presenterFactory/Config';
import handleError from '../../errors/handleError';

export interface HookOptions {
  readonly req: Request;
  readonly res: Response;
  readonly transactionId: string;
}

export interface Options {
  readonly config: Config;
  readonly beforeHandler?: (options: HookOptions) => Promise<any>;
}

const transactionWrapper = ({
  config,
  beforeHandler,
}: Options): TransactionHandler => async ({ req, res }, handler) => {
  const transactionId = uuid();
  try {
    if (beforeHandler !== undefined) {
      await beforeHandler({ transactionId, req, res });
    }

    await handler({ transactionId });
  } catch (error) {
    let err = error;
    
    if (error instanceof ConflictingItemError) {
      err = new ConflictError(error.itemName, error.itemId);
    }

    handleError({ config, errorId: transactionId, req, res, error: err });
  }
};

export default transactionWrapper;
