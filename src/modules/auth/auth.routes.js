const express = require('express');
const auth=require("./auth.controller");
const middle=require("./auth.middleware")
const adminController=require('../users/admin/admin.controller');
const managerController=require('../users/manager/manager.controller');
const workerController=require('../users/worker/worker.controller')

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/login',middle.signInValidator,auth.login);
router.post('/signup',middle.signUpValidator,middle.verifyUniqueDetails,auth.signup);
router.post('/admin/signup',middle.signUpValidator,middle.verifyUniqueDetails,adminController.signup)
router.post('/manager/signup',middle.signUpValidator,middle.verifyUniqueDetails,managerController.signup);
router.post('/worker/signup',middle.signUpValidator,middle.verifyUniqueDetails,workerController.signup);

module.exports=router;