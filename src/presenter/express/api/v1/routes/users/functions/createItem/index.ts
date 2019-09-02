import FacadeConfig from '@js-items/express/dist/FacadeConfig';
import RequestHandlerFactory from '@js-items/express/dist/types/RequestHandlerFactory';
import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { CREATED } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import { v4 as uuid } from 'uuid';
import hashPassword from '../../../../../../../../utils/helpers/auth/hashPassword';
import getUtcDate from '../../../../../../../../utils/helpers/date/getUtcDate';
import getVerifyEmailUrl from '../../../../../../../../utils/helpers/url/getVerifyEmailUrl';
import Config from '../../../../../../presenterFactory/Config';

const createItem = (factoryConfig: Config): RequestHandlerFactory => <
  I extends Item
>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeCreateItem
  );

  await transactionHandler({ req, res }, async () => {
    const id = uuid();

    const verifyToken = uuid();

    const password = !_isNil(req.body.password)
      ? await hashPassword(req.body.password)
      : undefined;

    const createdAt = getUtcDate();

    const data = {
      ...config.convertDocumentIntoItem({
        document: req.body,
        req,
        res,
      }),
      createdAt,
      id,
      password,
      verifyToken,
    };

    const { item } = await config.service.createItem({
      id,
      item: data,
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
      body: config.convertItemIntoDocument({ item, req, res }),
      config,
      req,
      res,
      status: CREATED,
    });
  });
};

export default createItem;
