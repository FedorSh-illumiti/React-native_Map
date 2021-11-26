const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    console.log(user);
    const token = jwt.sign({
        userId:user._id
    }, 'My_secret_key');

    res.send({token});
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("/signin", async (req,res)=>{
    const {email, password} = req.body;
    if (!email || !password) 
        return res.status(422).send({error: 'Must provide email and password'})
    
    const user = await User.findOne({ email });
    if (!user) res.status(422).send({error: 'Email not found'})

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId:user._id},'My_secret_key');
        res.send({token});
    } catch (error) {
        return res.status(422).send({error: 'Invalid password or email'})
    }
    
})

module.exports = router;
