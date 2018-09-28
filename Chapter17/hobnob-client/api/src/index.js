import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import * as middlewares from './middlewares';
import * as handlers from './handlers';

if (process.env.NODE_ENV === 'test') {
  process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;
  process.env.SERVER_PORT = process.env.SERVER_PORT_TEST;
} else {
  process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_DEV;
  process.env.SERVER_PORT = process.env.SERVER_PORT_DEV;
}

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({ limit: 1e6 }));
app.use(middlewares.checkContentType);
app.use(middlewares.checkContentLength);
app.use(middlewares.authenticate);

app.post('/login/', handlers.auth.login);
app.get('/salt/', handlers.auth.getSalt);
app.post('/users/', handlers.users.create);
app.get('/users/', handlers.users.search);
app.put('/users/:userId/profile', handlers.profile.replace);
app.patch('/users/:userId/profile', handlers.profile.update);
app.get('/users/:userId', handlers.users.retrieve);
app.delete('/users/:userId', handlers.users.del);

app.get('/openapi.yaml', (req, res, next) => {
  fs.readFile(`${__dirname}/openapi.yaml`, (err, file) => {
    if (err) {
      res.status(500);
      res.end();
      return next();
    }
    res.write(file);
    res.end();
    return next();
  });
});

app.use(middlewares.errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Hobnob API server listening on port ${process.env.SERVER_PORT}!`);
});
