const express = require('express');
const workerController=require("./worker.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const middle=require("../../auth/auth.middleware")
router.get('/signup',middle.signUpValidator,middle.verifyUniqueDetails,workerController.signup);
router.get('/:safeboxid/getallpackages',workerController.getallpackages);

module.exports=router;