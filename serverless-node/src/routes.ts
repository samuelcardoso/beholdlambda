import { validation } from './validation';
import { HandlerEvent, HandlerResponse } from 'serverless-openapi-joi/handler';

export const routes = [
    {
      method: 'GET',
      path: '/test',
      handler: test,
      summary: 'Run main',
      description: 'Returns all',
      tags: ['main'],
      // validation: {
      //   queryStringParameters: {
      //     limit: validation.limit,
      //     offset: validation.offset,
      //   },
      // },
      responses: {
        200: { description: 'Success!' },
      },
    },
  ];

  export async function test(event: HandlerEvent) {
    // const limit = Number(_.get(event.queryStringParameters, 'limit', '10'));
    // const offset = Number(_.get(event.queryStringParameters, 'offset', '0'));
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify("OK")
    };
  }