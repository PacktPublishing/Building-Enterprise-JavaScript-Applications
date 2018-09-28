function getValidPayload (type) {
  const lowercaseType = type.toLowerCase();
  switch (lowercaseType) {
    case 'create user':
      return {
        email: 'e@ma.il',
        password: 'password'
      };
  }
}

function convertStringToArray (string) {
  return string
    .split(',')
    .map(s=>s.trim())
    .filter(s=>s!=="");
}

export {
  getValidPayload,
  convertStringToArray,
}
