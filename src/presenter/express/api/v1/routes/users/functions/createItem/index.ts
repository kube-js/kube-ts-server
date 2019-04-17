import FacadeConfig from '@js-items/express/dist/FacadeConfig';
import RequestHandlerFactory from '@js-items/express/dist/types/RequestHandlerFactory';
import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { CREATED } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import getVerifyEmailUrl from '../../../../../../../../utils/helpers/url/getVerifyEmailUrl';
import Config from '../../../../../../presenterFactory/Config';

const createItem = (factoryConfig: Config):RequestHandlerFactory => <I extends Item>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeCreateItem
  );

  await transactionHandler({ req, res }, async () => {
    const { item } = await config.service.createItem({
      id: req.body.id,
      item: config.convertDocumentIntoItem({ document: req.body, req, res }),
    });

    const { appConfig, translator } = factoryConfig;

    const translations = translator({ req });

    const email = req.body.email;

    const link = getVerifyEmailUrl({
      config: appConfig.http.client,
      email,
      token: req.body.verifyToken,
    });

    const mailOptions = {
      from: appConfig.repo.mail.from,
      html: translations.verifyYourEmailHtml(link),
      subject: translations.verifyYourEmailSubject(),
      text: translations.verifyYourEmailText(link),
      to: email,
    };

    await factoryConfig.service.sendEmail(mailOptions);

    sendResponse({
      config,
      req,
      res,
      responseObject: config.convertItemIntoDocument({ item, req, res }),
      status: CREATED,
    });
  });
};

export default createItem;

// export default createItem;
// beforeCreateItem: async ({ req, res }, handler) => {
//   const transactionId = uuid();
//   try {
//     const payload: any = _pick(Object.keys(schema), req.body);
//     validateData(rules)(payload);

//     req.body.password = await hashPassword(req.body.password);
//     req.body.createdAt = new Date();
    
//     await handler({ transactionId });
//   } catch (error) {
//     let err = error;
//     if (error instanceof ConflictingItemError) {
//       err = new ConflictError(error.itemName, error.itemId);
//     }

//     handleError({ config, errorId: transactionId, req, res, error: err });
//   }
// },
