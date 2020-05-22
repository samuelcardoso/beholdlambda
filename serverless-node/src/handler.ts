import OpenAPIHandler from 'serverless-openapi-joi/handler';
import { routes } from './routes';

// const app = require('../dotnet/node/build/Release/program')
// console.log(app.hello());

// Ler: https://github.com/anttiviljami/serverless-openapi-joi
// https://github.com/anttiviljami/serverless-openapi-joi-boilerplate

const openapi = new OpenAPIHandler({
  info: {
    title: 'Example Pet API',
    description: 'Example CRUD API with Serverless OpenAPI Joi plugin',
    version: '0.1.0',
  },
  servers: [{ url: 'https://5oipict212.execute-api.eu-west-1.amazonaws.com/dev' }],
  swaggerEndpoint: '/docs',
  routes, // defined below
});


export async function api(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return openapi.handler(event);
  // NOTE: you should catch any errors from your handler
  // serverless-openapi-joi throws validation errors as Boom errors
}
