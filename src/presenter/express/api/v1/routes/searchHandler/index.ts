import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { toSnake } from 'convert-keys';
import { OK } from 'http-status-codes';
import Record from 'rulr/Record';
import validateData from 'rulr/validateData';
import { SAFE_URL_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';
import Config from '../../../../presenterFactory/Config';
import catchErrors from '../../../../utils/errors/catchErrors';


const searchHandler = (config: Config) =>
  catchErrors(config, async (req, res) => {
    const name = config.appConfig.http.client.searchQueryParamName;

    const validationSchema = {
      [name]: String(0, SAFE_URL_LENGTH),
    };

    const rules = Record(validationSchema);
    const value = req.query[name];

    const payload: any = {[name]:value};

    validateData(rules)(payload);

    const response = await config.service.search({
      query: value
    });
       
    sendResponse({
      body: toSnake(response),
      req,
      res,
      status: OK,
    });
  });

export default searchHandler;
