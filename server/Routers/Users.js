const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
//adding the Data --register
router.post("/add", async (req, res) => {
    console.log(req.body);
  const { emailid, name, password } = req.body;
  const countemail = await Users.count({ where: { emailid } });
  const countname = await Users.count({ where: { name } });
  if (countname > 0) {
    res.json({ err: "Name is Not available!" });
  } else if (countemail > 0) {
    res.json({ err: "Emailid is Already in use!" });
  } else {
    const psw = await bcrypt.hash(password, 10);
    const data = await Users.create({ emailid, name,    password: psw });

    res.json({msg:"User Registered!"});
  }
});

router.post("/login", async (req, res) => {
  //login
  const { name, password } = req.body;
  const data = await Users.count({ where: { name } });
  if (data == 1) {
    const originaldata = await Users.findOne({ where: { name } });

    const match = await bcrypt.compare(password, originaldata.password);
    if (match) {
    const od = await Users.findOne({ where: { id:originaldata.id },attributes:{exclude:["password"]}});

      res.json({ data:od,msg: "Logged in SuccessFully!" });
    } else {
      res.json({ msg: "Invalid Username or password!" });
    }
  } else {
    res.json({ msg: "Invalid Username or password!" });
  }
});
//forgot password or username
router.post("/login", async (req, res) => {
    const { emailid } = req.body;
    const data = await Users.count({ where: { emailid } });
    if (data == 1) {
      const originaldata = await Users.findOne({ where: { emailid },attributes:{exclude:['password']} });
        if (originaldata) {
        //send Email here!
        res.json({ msg: "Logged in SuccessFully!" });
      } else {
        res.json({ msg: "Invalid Username or password!" });
      }
    } 
    else
     {
      res.json({ msg: "Invalid Username or password!" });
    }
  });
module.exports = router;
