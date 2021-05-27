const express = require('express');
const managerController=require("./manager.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const middle=require("../../auth/auth.middleware")
router.get('/signup',middle.signUpValidator,middle.verifyUniqueDetails,managerController.signup);
router.get('/:safehouseid/getallpackages',managerController.getallpackages);
router.get('/:safehouseid/getallsafeboxes',managerController.getallsafeboxes);
router.post('/:safehouseid/:safeboxid',managerController.assigntobox);

module.exports=router;