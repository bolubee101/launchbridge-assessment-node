const express = require('express');
const packageController=require("./package.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/createpackage',packageController.createpackage);
router.get('/package/:packageid',packageController.findpackagebyid)

module.exports=router;