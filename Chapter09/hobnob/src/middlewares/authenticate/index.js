import jwt, { JsonWebTokenError } from 'jsonwebtoken';

function authenticate (req, res, next) {

  // Check if it is a GET request, if so carry on
  if(req.method === 'GET') { return next(); }

  // Check if the request is calling Create User or Login, if so carry on
  if(req.method === 'POST' && req.path === '/users/') { return next(); }
  if(req.method === 'POST' && req.path === '/login/') { return next(); }

  // Apart from the above endpoints, the client must provide an Authorization header, otherwise we should respond with a 401 Unauthorized
  const authorization = req.get('Authorization');

  if (authorization === undefined) {
    res.status(401);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The Authorization header must be set' });
    return;
  }

  // Next, we check that the value of the Authorization header is valid
  const [scheme, token] = authorization.split(' ');

  if(scheme !== 'Bearer') {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The Authorization header should use the Bearer scheme' });
    return;
  }

  const jwtRegEx = /^[\w-]+\.[\w-]+\.[\w-.+\/=]*$/;

  // If no token was provided, or the token is not a valid JWT token, return with a 400
  if (!token || !jwtRegEx.test(token)) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The credentials used in the Authorization header should be a valid bcrypt digest' });
    return;
  }

  // Attempt to verify the token. If it cannot be verified, return with a 400
  const options = { algorithms: ['RS512'] };
  jwt.verify(token, process.env.PUBLIC_KEY, options, (err, decodedToken) => {
    if (err) {
      if(err instanceof JsonWebTokenError && err.message === 'invalid signature') {
        res.status(400);
        res.set('Content-Type', 'application/json');
        res.json({ message: 'Invalid signature in token' });
        return;
      }
      res.status(500);
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Internal Server Error' });
      return;
    }
    req.user = Object.assign({}, req.user, {id: decodedToken.sub });
    next();
  });
}

export default authenticate;
