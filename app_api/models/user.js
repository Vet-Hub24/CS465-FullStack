const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_DIGEST = 'sha512';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

userSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(
      password,
      this.salt,
      PASSWORD_ITERATIONS,
      PASSWORD_KEY_LENGTH,
      PASSWORD_DIGEST
    )
    .toString('hex');
};

userSchema.methods.validPassword = function validPassword(password) {
  const candidateHash = crypto
    .pbkdf2Sync(
      password,
      this.salt,
      PASSWORD_ITERATIONS,
      PASSWORD_KEY_LENGTH,
      PASSWORD_DIGEST
    )
    .toString('hex');

  const stored = Buffer.from(this.hash, 'hex');
  const candidate = Buffer.from(candidateHash, 'hex');

  return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
};

userSchema.methods.generateJwt = function generateJwt() {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is required to generate authentication tokens.');
  }

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    jwtSecret,
    { expiresIn: '7d' }
  );
};

mongoose.model('users', userSchema);
