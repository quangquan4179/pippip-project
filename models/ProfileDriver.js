const mongoose = require('mongoose');
const DriverProfileSchema= new mongoose.Schema({
  driver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"driver"
  },
  address:{
    type:String,

  },
  email:{
    type:String
  },
  avatar:{
    type:String

  },
  license_photo:{
    type:String,
    unique
  },
  history:{
    type:String
  }

})
module.exports= driverProfile = mongoose.model('driverProfile',DriverProfileSchema);