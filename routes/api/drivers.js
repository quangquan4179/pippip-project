const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Driver = require("../../models/Driver");
const config = require("config");
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("phoneNumber", "Please include a valid phoneNumber").isEmpty(),
    check(
      "password",
      "Please  enter a password  with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
      return res.status(400).json({errors:errors.array()});
    }
    const {name,phoneNumber,password}=req.body;
    try {
      let driver = await Driver.findOne({phoneNumber});
      if( driver){
        return res.status(400).json({
          errors:[{msg:"Driver allready exists"}]
        })
      }
      driver =new Driver({
        name,
        phoneNumber,
        password
      })
      const salt= await bcrypt.genSalt(10);
      driver.password= await bcrypt.hash(password,salt);
      await driver.save();
      const payload ={
        driver:{
          id:driver.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:"1 day"},
        (err,token)=>{
          if (err) throw err;
          res.json({ token });

        }
      );
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error"); 
    }
  }
)
module.exports=router;