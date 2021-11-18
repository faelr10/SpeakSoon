const mongoose = require('../db/conn')
const { Schema } = mongoose

const Talk = mongoose.model(
  'Talk',
  new Schema({
    idTalk: {
      type: String,
      required: true,
    },
    messages: {
        type:Array,
        timestamps:true
    },
  }, {timestamps: true}),
)

module.exports = Talk
