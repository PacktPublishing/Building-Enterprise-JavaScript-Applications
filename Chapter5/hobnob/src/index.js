import express from 'express';
import bodyParser from 'body-parser';
import elasticsearch from 'elasticsearch';

const app = express();
app.use(bodyParser.json({ limit: 1e6 }));

const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

if (process.env.NODE_ENV === 'test') {
  process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;
  process.env.SERVER_PORT = process.env.SERVER_PORT_TEST;
} else {
  process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_DEV;
  process.env.SERVER_PORT = process.env.SERVER_PORT_DEV;
}

function checkContentTypeMiddleware (req, res, next) {
  if (
    // If the request is a POST, PATCH or PUT request
    ['POST', 'PATCH', 'PUT'].includes(req.method)
    // And the payload is not empty
    && req.headers['content-length'] !== "0"
  ) {
    // Then the req must have a Content-Type header
    if (!req.headers['content-type']) {
      res.status(400)
      res.set('Content-Type', 'application/json');
      res.json({ message: 'The "Content-Type" header must be set for POST, PATCH, and PUT requests with a non-empty payload.' });
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      res.status(415)
      res.set('Content-Type', 'application/json');
      res.json({ message: 'The "Content-Type" header must always be "application/json"' });
      return;
    }
  }
  next();
}

app.use(checkContentTypeMiddleware);


app.post('/users/', function (req, res) {
  if (req.headers['content-length'] === '0') {
    res.status(400)
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Payload should not be empty' });
    return;
  }
  if (
    !req.body.hasOwnProperty('email')
    || !req.body.hasOwnProperty('password')
  ) {
    res.status(400)
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Payload must contain at least the email and password fields' });
    return;
  }
  if (
    typeof req.body.email !== 'string'
    || typeof req.body.password !== 'string'
  ) {
    res.status(400)
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The email and password fields must be of type string' });
    return;
  }
  if (!/^[\w\.+]+@\w+\.\w+$/.test(req.body.email)) {
    res.status(400)
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The email field must be a valid email.' });
    return;
  }
  client.index({
    index: process.env.ELASTICSEARCH_INDEX,
    type: 'user',
    body: req.body
  })
  .then(function (result) {
    res.status(201);
    res.set('Content-Type', 'text/plain');
    res.send(result._id);
    return;
  }, function (err) {
    res.status(500);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Internal Server Error' });
    return;
  })
});

app.use(function errorHandler (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
    res.status(400)
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Payload should be in JSON format' });
    return;
  }
  next();
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Hobnob API server listening on port ${process.env.SERVER_PORT}!`);
});
