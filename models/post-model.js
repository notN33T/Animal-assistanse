const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true },
  mainText: { type: String, required: true },
  img: { type: String, required: true },
  comments: [{
      text: String, default: '' ,
      owner: String, default: '',
      avatar: String, default: '',
      admin: Boolean, default: '',
      date: { type: Date, default: Date.now },
  }],
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000,
  }
})

module.exports = model('Posts', PostSchema)
