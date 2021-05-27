const express = require('express');
const adminController=require("./admin.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/getallpackages',adminController.getallpackages);
router.get('/getallsafehouses',adminController.getallsafehouses);
router.get('/:safehouseid/packages',adminController.safeHousepackages);
router.post('/:safehouseid/assign',adminController.assignToSafehouse);

module.exports=router;