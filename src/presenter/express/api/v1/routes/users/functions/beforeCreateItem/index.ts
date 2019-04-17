import _pick from 'ramda/src/pick';
import validateData from 'rulr/validateData';
import { v4 as uuid } from 'uuid';
import hashPassword from '../../../../../../../../utils/helpers/auth/hashPassword';
// import getVerifyEmailUrl from '../../../../../../../../utils/helpers/url/getVerifyEmailUrl';
import rules, {
  schema,
} from '../../../../../../../express/utils/schemas/users/createItem';
import Config from '../../../../../../presenterFactory/Config';
import transactionWrapper, {
  HookOptions,
} from '../../../../../../utils/handlers/transactionWrapper';

const defaultTransactionHandler = (config: Config) =>
  transactionWrapper({
    beforeHandler: async ({ req }: HookOptions) => {
      const payload: any = _pick(Object.keys(schema), req.body);

      validateData(rules)(payload);

      req.body.password = await hashPassword(req.body.password);
      /** workaround for after hook for passing the verify token */
      req.body.verifyToken = uuid();

      /** TODO: move to service */
      req.body.createdAt = new Date();

      req.body.id = uuid();
    },
    config,
  });

export default defaultTransactionHandler;
