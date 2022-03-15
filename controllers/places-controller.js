const uuid = require('uuid');

const HttpError = require('./../models/http-error.js');
const { throwValidationError } = require('../utils/validationError');
const getCoordsForAddress = require('../utils/location.js');
const { validationResult } = require('express-validator');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous building in the world.',
    location: { lat: 40.748, lng: -73.987 },
    address: '20 W, 34th St, New York, NY',
    creator: 'u1',
  },
];

const getPlaceById = (req, res, next) => {
  const pid = req.params.pid;
  const place = DUMMY_PLACES.find((v) => v.id == pid);

  if (!place) {
    return next(new HttpError('Could not find a place for specified id.', 404));
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const uid = req.params.uid;
  const place = DUMMY_PLACES.filter((v) => v.creator == uid);

  if (place.length == 0) {
    return next(new HttpError('Could not find a place for specified user id.', 404));
  }

  res.json({ data: place });
};

const createPlace = async (req, res, next) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) return throwValidationError(req);

  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (e) {
    return next(e);
  }

  const createdPlace = { title, description, location: coordinates, address, creator, id: uuid.v4() };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ data: createdPlace });
};

const updatePlace = (req, res, next) => {
  throwValidationError(req);

  const { title, description } = req.body;
  const pid = req.params.pid;

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id == pid);
  const updatedPlace = { ...DUMMY_PLACES[placeIndex] };
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ data: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const pid = req.params.pid;

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id != pid);

  res.status(200).json({ message: 'Deleted Successfully' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
