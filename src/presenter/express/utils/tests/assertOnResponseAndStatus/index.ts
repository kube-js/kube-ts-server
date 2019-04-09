import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import supertest from 'supertest';

export interface BaseAssertionOptions {
  readonly request: supertest.SuperTest<any>;
  readonly fields?: { [key: string]: any };
  readonly statusCode?: number;
}

export interface AssertionOptions extends BaseAssertionOptions {
  readonly url: string;
}

const assertOnResponseAndStatus = async ({
  request,
  fields,
  statusCode = UNPROCESSABLE_ENTITY,
  url,
}: AssertionOptions) => {
  const { status, body } = await request
    .post(url)
    .set('Content-Type', 'application/json')
    .send(fields);

  expect(status).toBe(statusCode);
  expect(body).toMatchSnapshot();

  return { status, body };
};

export default assertOnResponseAndStatus;
