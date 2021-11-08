const { Schema, model } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: false, unique: true },
  admin: {type: Boolean, required: false, unique: false}
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
})

module.exports = model('User', schema)