const CLIENT_ID = process.env.CLIENT_ID || '0oa1rnx5pw6YOvfOP357';
const ISSUER = process.env.ISSUER || 'https://dev-454334.okta.com/oauth2/default';

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: window.location.origin + '/implicit/callback',
    pkce: true
  },
};