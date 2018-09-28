function checkContentType (req, res, next) {
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

export default checkContentType;
