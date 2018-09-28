import searchUser from '../../../engines/users/search';
import ValidationError from "../../../validators/errors/validation-error";

function search(req, res) {
  return searchUser(req)
    .then(function (result) {
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(result);
      return result;
    })
    .catch(function (err) {
      if (err instanceof ValidationError) {
        res.status(400);
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

export default search;
