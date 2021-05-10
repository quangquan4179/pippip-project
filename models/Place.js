const mongoose = require('mongoose');
const PlaceSchema = new mongoose.Schema({
  driver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"driver"
  },
  car:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"car"
  }

})
module.export = Place = mongoose.model('place',PlaceSchema);