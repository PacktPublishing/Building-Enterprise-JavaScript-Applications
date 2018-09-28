const validator = {
  email: (email) => /\S+@\S+\.\S+/.test(email),
  password: (password) => password.length > 11 && password.length < 48
}

export {
  validator,
}
