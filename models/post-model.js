const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String, required: true },
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000,
  }
})

module.exports = model('Posts', PostSchema)
