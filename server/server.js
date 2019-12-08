const express = require('./config/express.js')
//const OktaJwtVerifier = require('@okta/jwt-verifier');
//var cors = require('cors');
//const config = require('./config/config.js');

/*
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: config.okta.issuer,
  clientId: config.okta.clientId,
  assertClaims: {
    aud: 'api://default',
  },
}); */



/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */



/*
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return res.status(401).end();
  }

  const accessToken = match[1];
  const expectedAudience = 'api://default';

  return oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}
*/



const app = express.init();

/**
 * For local testing only!  Enables CORS for all domains
 */
//app.use(cors());

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */

 /*
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});
*/

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */

 /*
app.get('/api/messages', authenticationRequired, (req, res) => {
  res.json([{
    message: 'Hello, word!'
  }]);
});
*/

// Use env port or default
const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server now running on port ${port}!`));

//port requirments for heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);