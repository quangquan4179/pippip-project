const express = require("express");
const axios = require("axios");
const router = express.Router();
router.post("/", async (req, res) => {
  const { origin_addresses, destination_addresses } = req.body;
  console.log(origin_addresses, destination_addresses);

  const distance = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin_addresses},DC&destinations=${destination_addresses},NY&key=AIzaSyDhlEjSqqWST8ftI1raxFfs79NtxMxlRik`
  );
  return res.status(200).json(distance.data);
});
module.exports = router;
