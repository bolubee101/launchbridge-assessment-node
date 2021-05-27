const express = require('express');
const workerController=require("./worker.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/:safeboxid/getallpackages',workerController.getallpackages);

module.exports=router;