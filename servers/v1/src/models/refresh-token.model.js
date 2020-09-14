const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  created: {
    date: { type: Date, default: Date.now },
    ip: String
  },
  revoked: { date: Date, ip: String },
  replacedWith: String
});

schema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function () {
  return !this.revoked.date && !this.isExpired;
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.id;
    delete ret.user;
  }
});

exports.RefreshToken = model('RefreshToken', schema);