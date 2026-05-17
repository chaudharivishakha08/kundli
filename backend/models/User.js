const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 32
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
  },
    role:{
    type:String,
    enum: ['User', 'Admin'], // restricts to these values
    default: 'User' 
  }
});

module.exports = mongoose.model('User', userSchema);
