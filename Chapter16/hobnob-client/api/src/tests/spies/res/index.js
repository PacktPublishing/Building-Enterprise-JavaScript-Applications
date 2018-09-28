import { spy } from 'sinon';

function generateResSpy () {
  return {
    status: spy(),
    set: spy(),
    json: spy(),
    send: spy(),
  };
}

export default generateResSpy;
