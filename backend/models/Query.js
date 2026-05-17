const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  mobileNo: {
    type: String,
    required: true,
  },
    name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status:{
    type:String,
    enum: ['in process', 'done'], // restricts to these values
    default: 'in process' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Query', querySchema);
