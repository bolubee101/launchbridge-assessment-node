const express = require('express');
const managerController=require("./manager.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/:safehouseid/getallworkers',managerController.getworkers)
router.get('/:safehouseid/getallpackages',managerController.getallpackages);
router.get('/:safehouseid/getallsafeboxes',managerController.getallsafeboxes);
router.post('/:safehouseid/:safeboxid',managerController.assigntobox);
router.post('/:safehouseid/assignworker',managerController.assignWorker);


module.exports=router;