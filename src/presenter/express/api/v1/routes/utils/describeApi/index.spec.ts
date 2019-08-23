import dotenv from 'dotenv';
import assertOnResponseAndStatus from '../../../../../utils/tests/assertOnResponseAndStatus';
dotenv.config();
import { OK } from 'http-status-codes';
import { API_V1 } from '../../../../../../../constants/routes';
import initTests from '../../../../../utils/tests/initTests';

describe('@presenter/describeApi', () => {
  const { request } = initTests({ useMailServer: true });

  it('describes API metadata', async () => {
    await assertOnResponseAndStatus({
      method: 'get',
      request,
      statusCode: OK,
      url: API_V1,
    });
  });
});
