const AWS = require('aws-sdk');
const awsXRay = require('aws-xray-sdk');
const awsSdk = awsXRay.captureAWS(AWS);

export default class LambdaExternal {
  public static async call(functionName: string, payload?): Promise<Array<any>> {
    const lambda = new awsSdk.Lambda({
      region: 'us-east-1'
    });
    const params = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: payload ? JSON.stringify(payload) : undefined
    };

    return new Promise<Array<any>>((resolve, reject) => {
      lambda.invoke(params, (err, data) => {
        if (err) {
          console.error(err);
          return reject(err);
        }

        const ans = JSON.parse(data.Payload);
        if (ans.statusCode === 200) {
          return resolve(JSON.parse(ans.body));
        }
        return reject();
      });
    });
  }
}
