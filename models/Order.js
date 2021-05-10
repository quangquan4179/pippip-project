const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  driver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"driver"

  },
  car:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"car"
  },
  startLocation:{
    type:String
  },
  endLocation:{
    type:String
  },
  pickUp_Time:{
    type:Date
  },
  status:{
    type:String
  },
  price:{
    type:Number
  },
  evaluate:{
    type:String
  }

})
module.exports=Order =  mongoose.model('order',OrderSchema);