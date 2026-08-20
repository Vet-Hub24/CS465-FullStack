const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const requiredFields = [
  'code',
  'name',
  'length',
  'start',
  'resort',
  'perPerson',
  'image',
  'description'
];

const getTripPayload = body => ({
  code: (body.code || '').trim(),
  name: (body.name || '').trim(),
  length: (body.length || '').trim(),
  start: body.start,
  resort: (body.resort || '').trim(),
  perPerson: (body.perPerson || '').trim(),
  image: (body.image || '').trim(),
  description: (body.description || '').trim()
});

const findMissingFields = payload =>
  requiredFields.filter(field => payload[field] === undefined || payload[field] === null || payload[field] === '');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('Trip list error:', err);
    return res.status(500).json({ message: 'Unable to retrieve trips.' });
  }
};

const tripsFindByCode = async (req, res) => {
  const tripCode = (req.params.tripCode || '').trim();

  if (!tripCode) {
    return res.status(400).json({ message: 'Trip code is required.' });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip code ${tripCode} was not found.` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    console.error('Trip lookup error:', err);
    return res.status(500).json({ message: 'Unable to retrieve the trip.' });
  }
};

const tripsAddTrip = async (req, res) => {
  const payload = getTripPayload(req.body);
  const missing = findMissingFields(payload);

  if (missing.length) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}.` });
  }

  try {
    const newTrip = await Trip.create(payload);
    return res.status(201).json(newTrip);
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: `Trip code ${payload.code} already exists.` });
    }

    console.error('Trip creation error:', err);
    return res.status(400).json({ message: 'Unable to add the trip.' });
  }
};

const tripsUpdateTrip = async (req, res) => {
  const tripCode = (req.params.tripCode || '').trim();
  const payload = getTripPayload(req.body);
  const missing = findMissingFields(payload);

  if (!tripCode) {
    return res.status(400).json({ message: 'Trip code is required.' });
  }

  if (missing.length) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}.` });
  }

  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: tripCode },
      payload,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({ message: `Trip code ${tripCode} was not found.` });
    }

    return res.status(200).json(updatedTrip);
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: `Trip code ${payload.code} already exists.` });
    }

    console.error('Trip update error:', err);
    return res.status(400).json({ message: 'Unable to update the trip.' });
  }
};

const tripsDeleteTrip = async (req, res) => {
  const tripCode = (req.params.tripCode || '').trim();

  if (!tripCode) {
    return res.status(400).json({ message: 'Trip code is required.' });
  }

  try {
    const deletedTrip = await Trip.findOneAndDelete({ code: tripCode }).exec();

    if (!deletedTrip) {
      return res.status(404).json({ message: `Trip code ${tripCode} was not found.` });
    }

    return res.status(200).json({ message: `Trip code ${tripCode} deleted successfully.` });
  } catch (err) {
    console.error('Trip deletion error:', err);
    return res.status(500).json({ message: 'Unable to delete the trip.' });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
