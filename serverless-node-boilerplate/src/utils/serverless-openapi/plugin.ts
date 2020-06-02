export default class OpenApiJoiPlugin {
  private serverless: any;

  constructor(serverless: any) {
    this.serverless = serverless;
    this.serverless.getVersion();
  }
}
