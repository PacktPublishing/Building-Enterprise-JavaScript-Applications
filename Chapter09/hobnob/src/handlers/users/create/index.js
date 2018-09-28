import createUser from '../../../engines/users/create';
import ValidationError from "../../../validators/errors/validation-error";

function create(req, res) {
  return createUser(req)
    .then(function (result) {
      res.status(201);
      res.set('Content-Type', 'text/plain');
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

export default create;
