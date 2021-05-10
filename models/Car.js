const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
  type:{
    type: String
  }

})
module.exports= Car = mongoose.model('car',CarSchema);