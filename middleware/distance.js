
const axios = require('axios')
 const distances= async(origin_addresses,destination_addresses) => await axios.get(
   "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyDhlEjSqqWST8ftI1raxFfs79NtxMxlRik"
 );
module.exports = distances