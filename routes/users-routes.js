const express = require('express');
const { check } = require('express-validator');
const usersController = require('./../controllers/users-controller');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.post(
  '/signup',
  check('name').not().isEmpty(),
  check('email').normalizeEmail().isEmpty(),
  check('password').isLength({ min: 6 }),
  usersController.signup
);

router.post('/login', check('email').normalizeEmail().isEmpty(), check('password').isLength({ min: 6 }), usersController.login);

module.exports = router;
