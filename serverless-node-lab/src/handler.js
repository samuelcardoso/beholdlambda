const obj = { value1: 0 };

exports.hello =  async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  let value2 = 0;
  
  obj.value1++;
  value2++;
  
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      value1: obj.value1,
      value2: value2
    })
  };
}

exports.longHello =  async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  setTimeout(() => {
    console.log('Run something later...')
  }, 5000);
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify('Hello World')
  };
}