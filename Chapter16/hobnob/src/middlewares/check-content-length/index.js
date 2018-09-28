// For requests of type POST, PATCH and PUT
// Our endpoint would all be expecting a payload of some sort
function checkContentLength (req, res, next) {
  if (
    // If the request is a POST, PATCH or PUT request
    ['POST', 'PATCH', 'PUT'].includes(req.method)
    && req.headers['content-length'] === '0'
  ) {
    res.status(400)
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Payload should not be empty' });
    return;
  }
  next();
}

export default checkContentLength;
