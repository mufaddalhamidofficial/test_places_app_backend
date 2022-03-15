const express = require('express');
const { check } = require('express-validator');

const placesController = require('./../controllers/places-controller');

const router = express.Router();

router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getPlacesByUserId);

router.post(
  '/',
  check(['title', 'address'], 'value should not be empty!').not().isEmpty(),
  check('description', 'Description should be minimum 5 characters!').isLength({ min: 5 }),
  placesController.createPlace
);

router.patch(
  '/:pid',
  check('title', 'value should not be empty!').not().isEmpty(),
  check('description', 'Description should be minimum 5 characters!').isLength({ min: 5 }),
  placesController.updatePlace
);

router.delete('/:pid', placesController.deletePlace);

module.exports = router;
