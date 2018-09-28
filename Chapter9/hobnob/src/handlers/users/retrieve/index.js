import retrieveUser from '../../../engines/users/retrieve';

function retrieve(req, res) {
  return retrieveUser(req)
    .then(function (result) {
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(result);
      return result;
    })
    .catch(function (err) {
      if (err.message === 'Not Found') {
        res.status(404);
        res.set('Content-Type', 'application/json');
        res.json({ message: err.message });
        return err;
      }
      res.status(500);
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Internal Server Error' });
      return err;
    })
}

export default retrieve;
