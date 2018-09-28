import replaceProfile from '../../../engines/profile/replace';
import ValidationError from "../../../validators/errors/validation-error";

function replace(req, res) {
  return replaceProfile(req)
    .then(function (result) {
      res.status(200);
      res.set('Content-Type', 'text/plain');
      res.send();
      return result;
    })
    .catch(function (err) {
      if (err instanceof ValidationError) {
        res.status(400);
        res.set('Content-Type', 'application/json');
        res.json({ message: err.message });
        return err;
      }
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

export default replace;
