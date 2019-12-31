
const router = require("express").Router();
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const { registerValidation, loginValidation } = require("../models/req-validator")

router.get("/test", (req, res) => {
    return res.send("this is testing endpoint");
});

router.get("/auth", (req, res) => {
    console.log('Date is ' + Date.now());
    const token = jwt.sign({ _id: Date.now() }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
})


router.post("/login", async (req, res) => {
    const errorMsg = { 'message': '' };
    const { error } = loginValidation(req.body);
    if (error) {
        errorMsg.message = error.details[0].message;
        return res.status(400).json(errorMsg);
    }

    //const user = await User.findOne({email:req.body.username});
    const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] });
    console.log(user)
    if (!user) {
        errorMsg.message = "Username is not found.";
        return res.status(400).json(errorMsg);
    }

    const verify_user = await bcrypt.compare(req.body.password, user.password);
    if (!verify_user){
        errorMsg.message="Password invalid."
        return res.status(400).json(errorMsg);
    } 
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    //const trimUser = new Object({},user.email,user.id);
    return res.header("auth_token", token).send(user);

});

router.post("/register", async (req, res) => {
    const errorMsg = { 'message': '' };
    const { error } = registerValidation(req.body);
    if (error) {
        console.log(" ===" + JSON.stringify(error));
        errorMsg.message = error.details[0].message;
        return res.status(400).json(errorMsg);
    }

    const userExists = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

    if (userExists) {
        errorMsg.message = "User email id is already registered. Please try with another email address.";
        return res.status(400).json(errorMsg);
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashpassword
    });

    try {
        console.log(JSON.stringify(user));
        const saveUser = await user.save();
        res.send(saveUser)
    } catch (error) {
        console.log("error =>" + error);
        errorMsg.message =  error ;
        res.status(400).json(errorRes);
    }

})


module.exports = router;