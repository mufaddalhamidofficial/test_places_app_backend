const HttpError = require('./../models/http-error.js');
const uuid = require('uuid');

const { throwValidationError } = require('../utils/validationError');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Mufaddal Hamid',
    email: 'test@gmail.com',
    password: '123456',
  },
  {
    id: 'u2',
    name: 'Test 2',
    email: 'test1@gmail.com',
    password: '123456',
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ data: DUMMY_USERS });
};

const signup = (req, res, next) => {
  throwValidationError(req);
  const { name, email, password } = req.body;
  const hasUser = !!DUMMY_USERS.find((v) => v.email == email);
  if (hasUser) {
    return next(new HttpError('Could not create user, email already exists', 422));
  }
  const user = { id: uuid.v4(), name, email, password };

  DUMMY_USERS.push(user);

  res.status(201).json({ data: user, message: 'Registered Successfully' });
};

const login = (req, res, next) => {
  throwValidationError(req);
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((v) => v.email == email && v.password == password);

  if (!user) {
    return next(new HttpError('Invalid Email and Password', 404));
  }

  res.json({ data: user, message: 'Successfully logged in.' });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
