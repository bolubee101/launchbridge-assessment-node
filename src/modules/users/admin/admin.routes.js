const express = require('express');
const adminController=require("./admin.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const middle=require("../../auth/auth.middleware")
router.get('/signup',middle.signUpValidator,middle.verifyUniqueDetails,adminController.signup);
router.get('/getallpackages',adminController.getallpackages);
router.get('/getallsafehouses',adminController.getallsafehouses);
router.get('/:safehouseid/packages',adminController.safeHousepackages);
router.post('/:safehouseid/assign',adminController.assignToSafehouse);
router.get('/createsafehouse',adminController.createSafehouse)

module.exports=router;