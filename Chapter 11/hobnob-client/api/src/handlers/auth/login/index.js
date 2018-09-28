import loginUser from '../../../engines/auth/login';
import ValidationError from "../../../validators/errors/validation-error";

function login(req, res) {
  return loginUser(req)
    .then(function (result) {
      res.status(200);
      res.set('Content-Type', 'text/plain');
      res.send(result);
    })
    .catch(function (err) {
      res.set('Content-Type', 'application/json');
      if (err instanceof ValidationError) {
        res.status(400);
        res.json({ message: err.message });
      } else if (err.message = 'Not Found') {
        res.status(401);
        res.json({ message: 'There are no records of an user with this email and password combination' })
      } else {
        res.status(500);
        res.json({ message: 'Internal Server Error' });
      }
      return err;
    })
}

export default login;
