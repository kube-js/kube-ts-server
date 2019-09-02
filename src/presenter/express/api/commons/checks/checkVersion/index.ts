import sendResponse from '@js-items/express/dist/utils/sendResponse';
import * as git from 'git-rev';
import { OK } from 'http-status-codes';
import Config from '../../../../presenterFactory/Config';
import catchErrors from '../../../../utils/errors/catchErrors';

export default (config: Config) =>
  catchErrors(config, async (req, res) => {
    const [short, long, branch, tag] = await Promise.all([
      new Promise<string>(resolve => {
        git.short(resolve);
      }),
      new Promise<string>(resolve => {
        git.long(resolve);
      }),
      new Promise<string>(resolve => {
        git.branch(resolve);
      }),
      new Promise<string>(resolve => {
        git.tag(resolve);
      }),
    ]);

    sendResponse({
      body: { short, long, branch, tag },
      req,
      res,
      status: OK,
    });
  });
