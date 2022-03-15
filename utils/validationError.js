const HttpError = require('../models/http-error.js');

const throwValidationError = (req, shouldThrow = true) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    errors = errors.errors.map((err) =>
      err.msg.replace(new RegExp('value', 'g'), `${err.param.substring(0, 1).toUpperCase()}${err.param.substring(1)}`)
    );
    var error = new HttpError('Invalid inputs passed, please check your data.', 422, { errors });
    if (shouldThrow) throw error;
    else next(error);
  }
};

exports.throwValidationError = throwValidationError;
