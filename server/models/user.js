import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UserSchema = new Schema({
  email: String,
  password: String
});

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcryptjs.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const user = mongoose.model('user', UserSchema);
export default user;
