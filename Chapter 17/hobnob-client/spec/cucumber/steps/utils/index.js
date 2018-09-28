import Chance from 'chance';
const chance = new Chance();

function generateSampleData (type, valid = true) {
  switch (type) {
    case 'email':
      return valid ? chance.email() : chance.string()
      break;
    case 'password':
      return valid ? chance.string({ length: 13 }) : chance.string({ length: 5 });
      break;
    default:
      throw new Error('Unsupported data type')
      break;
  }
}

export {
  generateSampleData,
}
