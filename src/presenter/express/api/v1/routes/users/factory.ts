import expressFactory from '@js-items/express/dist/factory';
import { ConflictingItemError } from '@js-items/foundation';
import { toCamel, toSnake } from 'convert-keys';
import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import ConflictError from '../../../../../../utils/errors/http/ConflictError';
import hashPassword from '../../../../../../utils/helpers/auth/hashPassword';
import getVisibleUserProperties from '../../../../../../utils/helpers/model/getVisibleUserProperties';
import Config from '../../../../presenterFactory/Config';
import handleError from '../../../../utils/errors/handleError';
import rules, { schema } from '../../../../utils/schemas/users/createItem';

const usersFactory = (config: Config) =>
  expressFactory({
    beforeCreateItem: async ({ req, res }, handler) => {
      const transactionId = uuid();
      try {
        const payload: any = _pick(Object.keys(schema), req.body);
        validateData(rules)(payload);

        req.body.password = await hashPassword(req.body.password);
        req.body.createdAt = new Date();
        
        await handler({ transactionId });
      } catch (error) {
        let err = error;
        if (error instanceof ConflictingItemError) {
          err = new ConflictError(error.itemName, error.itemId);
        }

        handleError({ config, errorId: transactionId, req, res, error: err });
      }
    },
    convertDocumentIntoItem: ({ document }) => {
      // tslint:disable-next-line:no-console
      const documentCamelised: any = toCamel(document);

      return { ...documentCamelised };
    },
    convertItemIntoDocument: ({ item }) => {
      const user = getVisibleUserProperties(item);

      return toSnake(user);
    },
    defaultTransactionHandler: async ({ req, res }, handler) => {
      const transactionId = uuid();
      try {
        // tslint:disable-next-line:no-console
        req.body.password = await hashPassword(req.body.password);
        await handler({ transactionId });
      } catch (error) {
        handleError({ config, errorId: transactionId, req, res, error });
      }
    },
    service: config.service.users,
  });

export default usersFactory;
