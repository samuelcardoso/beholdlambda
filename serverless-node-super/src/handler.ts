import * as Boom from '@hapi/boom';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createLogger } from './utils/logger.util';
import petRoutes from './business/pet/pet.route';
import { OpenAPIInfo } from './utils/serverless-openapi';
import OpenAPIHandler from './utils/serverless-openapi/handler';
// import SequelizeUtils from './utils/sequelize.util';
import RequestUtils from './utils/request.util';

// const conn = SequelizeUtils.conn();
const conn = {};
const auth = {};
const logger = createLogger('generic');

export const info: OpenAPIInfo = {
  title: 'Behold Lambda project',
  description: 'Boilerplate Lambda Project to let you rock',
  version: '1.0.0'
};

export async function api(event: Partial<APIGatewayProxyEvent>, context: Context): Promise<any> {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const openapi = new OpenAPIHandler({
      info,
      servers: [{ url: process.env.BASEURL! }],
      routes: [
        ...petRoutes
      ],
      swaggerEndpoint: '/apidocs'
    });
    const { statusCode, body, headers } = await openapi.handler(event, undefined, { conn: conn, auth: auth });
    return {
      statusCode,
      body,
      headers: {
        ...RequestUtils.getCors(),
        ...headers
      }
    };
  } catch (err) {
    logger.error(err);
    let boom;
    if (err.isBoom) {
      boom = err.output;
    } else {
      // unknown error
      logger.error(err);
      boom = Boom.badImplementation('Internal API error').output;
    }
    return {
      statusCode: boom.statusCode,
      body: JSON.stringify({
        ...boom.payload,
        ...(process.env.NODE_ENV === 'dev') ? { debug_error: JSON.stringify(err) } : undefined
      }),
      headers: {
        ...RequestUtils.getCors()
      }
    };
  }
}
