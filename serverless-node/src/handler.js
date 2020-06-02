exports.hello =  async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify('Hello World')
  };
}