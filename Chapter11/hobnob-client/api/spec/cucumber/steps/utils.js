import objectPath from 'object-path';


function getValidPayload (type, context = {}) {
  const lowercaseType = type.toLowerCase();
  switch (lowercaseType) {
    case 'get salt':
      return {
        email: context.email || 'e@ma.il'
      };
    case 'create user':
    case 'login':
      return {
        email: context.email || 'e@ma.il',
        digest: context.digest || '$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy'
      };
    case 'replace user profile':
      return {
        summary: context.summary || 'foo'
      };
    case 'update user profile':
      return {
        name: context.name || {
          middle: 'd4nyll'
        }
      };
  }
}

function convertStringToArray (string) {
  return string
    .split(',')
    .map(s=>s.trim())
    .filter(s=>s!=="");
}

function substitutePath (context, path) {
  // First split the path into parts
  return path.split('/').map(part => {
    // If the part starts with a colon (:),
    // perform a substitution with the value of the context property with the same name
    if (part.startsWith(':')) {
      const contextPath = part.substr(1);
      return objectPath.get(context, contextPath);
    }
    return part;
  }).join('/');
}

function processPath (context, path) {
  // If the path does not contain a colon, there's no substitution to be done
  if (!path.includes(':')) {
    return path;
  }
  return substitutePath(context, path);
}

export {
  getValidPayload,
  convertStringToArray,
  processPath,
}
