export default class RequestUtils {
  static getCors() {
    return {
      'X-Requested-With': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    };
  };

  static parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  static getUserId(token) {
    if (token) {
      const tokenParsed = RequestUtils.parseJwt(token);
      return tokenParsed.sub;
    }
    return null;
  };
}
