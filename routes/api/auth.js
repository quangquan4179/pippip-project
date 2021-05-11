const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Driver = require("../../models/Driver");
const config = require("config");

// @route    GET api/auth/user=> token (auth)
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    POST api/auth/user=>token (login)

router.post(
  "/user",
  [
    check("phoneNumber", "Please include a valid phoneNumber").isEmpty(),
    check("password", "Please  is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phoneNumber, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ phoneNumber });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials " }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1 day" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
// @route    GET api/auth/driver=> token (auth)

router.get("/driver", auth, async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id).select("-password");
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//@route    POST api/auth/driver=>token (login)

router.post(
  "/driver",
  [
    check("phoneNumber", "Please include a valid phoneNumber").isEmpty(),
    check("password", "Please  is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phoneNumber, password } = req.body;
    try {
      //see if driver exists
      let driver = await Driver.findOne({ phoneNumber });
      if (!driver) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials " }] });
      }

      const isMatch = await bcrypt.compare(password, driver.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: driver.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1 day" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
