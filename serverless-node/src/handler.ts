export async function hello(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify('Hello World')
  };
}
