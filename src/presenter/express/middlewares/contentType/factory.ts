import { NextFunction, Request, Response } from 'express';
import { UNSUPPORTED_MEDIA_TYPE } from 'http-status-codes';
import { Options as TranslatorOptions } from '../../../../translator/default/factory';
import Translation from '../../../../translator/default/translations/interfaces';

/* 
  @source: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
  "An API that accepts JSON encoded POST, PUT & PATCH requests should 
  also require the Content-Type header be set to application/json or throw 
  a 415 Unsupported Media Type HTTP status code.
*/

export interface Options {
  readonly translator: (options: TranslatorOptions) => Translation;
  readonly contentType?: string;
  readonly methods?: string[];
}

export default ({
  contentType = 'json',
  methods = ['POST', 'PATCH', 'PUT'],
  translator,
}: Options) => (req: Request, res: Response, next: NextFunction) => {
  const hasRequiredContentType = Boolean(req.is(contentType));
  
  /* @see https://expressjs.com/tr/api.html#req.is */
  if (!hasRequiredContentType && methods.includes(req.method)) {
    const translations = translator({ req });

    return res.status(UNSUPPORTED_MEDIA_TYPE).json({
      message: translations.unsupportedMediaType(),
    });
  }

  next();
};
