
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: '{clientId}',
    redirectUri: window.location.origin + '/implicit/callback',
    pkce: true
  },
};