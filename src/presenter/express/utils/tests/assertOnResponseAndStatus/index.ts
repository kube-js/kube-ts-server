import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import supertest from 'supertest';

export interface Request extends supertest.SuperTest<any> {
  readonly [key: string]: any;
}

export interface BaseAssertionOptions {
  readonly request: Request;
  readonly fields?: { [key: string]: any };
  readonly statusCode?: number;
}

export interface AssertionOptions extends BaseAssertionOptions {
  readonly url: string;
  readonly method?: string;
}

const assertOnResponseAndStatus = async ({
  request,
  fields,
  method = 'post',
  statusCode = UNPROCESSABLE_ENTITY,
  url,
}: AssertionOptions) => {
  // tslint:disable-next-line:no-string-literal
  const { status, body } = await request[method](url)
    .set('Content-Type', 'application/json')
    .send(fields);

  expect(status).toBe(statusCode);
  expect(body).toMatchSnapshot();

  return { status, body };
};

export default assertOnResponseAndStatus;
