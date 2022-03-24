const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom(async email => {
      const user = await User.findOne({ email });

      if (user) throw new Error('Email already registered to another user.');
    }),
  check('username')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long.')
    .isLength({ max: 25 })
    .withMessage('Username cannot be longer than 25 characters.')
    .bail()
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .custom(async username => {
      const user = await User.findOne({ username });

      if (user) throw new Error('Username already in use.');
      return true;
    }),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Confirm Password field is required.')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password and Confirm Password must match.');
      }
      return true;
    }),
  handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find();

  const data = users.reduce((accum, user) => {
    accum[user.id] = user.toSafeObject();
    return accum;
  }, {});

  return res.json(data);
}));

// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  const user = await User.signup({ email, username, password });

  setTokenCookie(res, user);

  return res.json(user.toSafeObject());
}));

module.exports = router;
