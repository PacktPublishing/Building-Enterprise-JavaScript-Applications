export default class NotFoundError extends Error {
  constructor(...args) {
    super(args);
    this.status = 404;
    this.statusCode = 404;
    this.displayName = 'NotFound';
    this.message = 'Not Found';
    this.body = { found: false };
  }
}
