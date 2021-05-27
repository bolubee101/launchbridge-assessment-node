const express = require('express');
const packageController=require("./package.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/createpackage',packageController.createpackage);
router.get('/:packageid',packageController.findpackagebyid)

module.exports=router;