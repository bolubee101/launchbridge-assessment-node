const express = require('express');
const adminController=require("./admin.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/getallpackages',adminController.getallpackages);
router.get('/getallsafehouses',adminController.getallsafehouses);
router.get('/:safehouseid/packages',adminController.safeHousepackages);
router.post('/:safehouseid/assignmanager',adminController.assignManager);
router.post('/:safehouseid/assignworker',adminController.assignWorker);
router.post('/:safehouseid/assigntosafehouse',adminController.assignToSafehouse);
router.get('/createsafehouse',adminController.createSafehouse)
router.get('/users',adminController.getallusers);

module.exports=router;