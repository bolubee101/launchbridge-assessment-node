const express = require('express');
const auth=require("./auth.controller");
const middle=require("./auth.middleware")

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/login',middle.signInValidator,auth.login);
router.post('/signup',middle.signUpValidator,middle.verifyUniqueDetails,auth.signup);

module.exports=router;