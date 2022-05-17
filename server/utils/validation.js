const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().reduce((accum, error) => ({
      ...accum,
      [error.param]: error.msg,
    }), {});

    const err = Error('Bad request.');
    err.status = 400;
    err.title = 'Bad request.';
    err.errors = errors;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
