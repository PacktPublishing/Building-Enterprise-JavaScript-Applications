import deleteUser from '../../../engines/users/delete';

function del(req, res) {
  return deleteUser(req)
    .then(function (result) {
      res.status(200);
      res.set('Content-Type', 'text/plain');
      res.send();
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

export default del;
