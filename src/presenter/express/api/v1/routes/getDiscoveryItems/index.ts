import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { toSnake } from 'convert-keys';
import { OK } from 'http-status-codes';
import Config from '../../../../presenterFactory/Config';
import catchErrors from '../../../../utils/errors/catchErrors';

const getDiscoveryItems = (config: Config) =>
  catchErrors(config, async (req, res) => {
    const type = req.query.type;
    
    let response;
    
    switch (type) {
      case 'homepage':
      default:
        response = await config.service.getDiscoveryItemsForHomepage({});
    }

    sendResponse({
      body: toSnake(response),
      req,
      res,
      status: OK,
    });
  });

export default getDiscoveryItems;
