const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: {type: String, required: true},
  admin: {type: Boolean, required: false, unique: false},
  token: { type: String, required: false, unique: true },
  avatar: {type: String, required: false, default: 'defoultAvatar.jpg'},
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
})

module.exports = model('User', schema)