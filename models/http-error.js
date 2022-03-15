class HttpError extends Error {
  constructor(message, errorCode, otherData) {
    super(message);
    this.code = errorCode;
    this.otherData = otherData || {};
  }
}

module.exports = HttpError;
