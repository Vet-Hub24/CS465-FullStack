const mongoose = require('mongoose');
const Trip = require('./travlr');
const trips = require('../../data/trips.json');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

mongoose.connect(dbURI, {});

mongoose.connection.on('connected', async () => {
  console.log(`Mongoose connected to ${dbURI}`);

  try {
    await Trip.deleteMany({});
    console.log('Existing trips removed.');

    await Trip.insertMany(trips);
    console.log(`${trips.length} trips inserted successfully.`);
  } catch (err) {
    console.log('Seed error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Mongoose connection closed.');
  }
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});