function generateHumanFriendlyErrorMessage (errors, pathPrefix = '') {
  const error = errors[0];
  if (error.keyword === 'required') {
    return `The '${pathPrefix}${error.dataPath}.${error.params.missingProperty}' field is missing`;
  }
  if (error.keyword === 'type') {
    return `The '${pathPrefix}${error.dataPath}' field must be of type ${error.params.type}`;
  }
  if (error.keyword === 'format') {
    return `The '${pathPrefix}${error.dataPath}' field must be a valid ${error.params.format}`;
  }
  if (error.keyword === 'additionalProperties') {
    return `The '${pathPrefix}${error.dataPath}' object does not support the field '${error.params.additionalProperty}'`;
  }
  return 'The object is not valid';
}

export default generateHumanFriendlyErrorMessage;
