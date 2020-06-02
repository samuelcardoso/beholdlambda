import * as Boom from '@hapi/boom';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createLogger } from './utils/logger.util';
import petRoutes from './business/pet/pet.route';
import { OpenAPIInfo } from './utils/serverless-openapi';
import OpenAPIHandler from './utils/serverless-openapi/handler';

const conn = {};
const auth = {};
const logger = createLogger('generic');

export const info: OpenAPIInfo = {
  title: 'Behold Lambda project',
  description: 'Boilerplate Lambda Project to let you rock',
  version: '1.0.0'
};

export const corsHeaders = {
  'X-Requested-With': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*'
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
        ...corsHeaders,
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
        ...corsHeaders
      }
    };
  }
}
