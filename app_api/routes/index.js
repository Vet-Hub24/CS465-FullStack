const express = require('express');
const router = express.Router();
const passport = require('passport');

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');

const auth = passport.authenticate('jwt', { session: false });

router
  .route('/register')
  .post(authenticationController.register);

router
  .route('/login')
  .post(authenticationController.login);

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(auth, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip)
  .delete(auth, tripsController.tripsDeleteTrip);

module.exports = router;