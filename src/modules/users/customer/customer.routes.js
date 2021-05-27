const express = require('express');
const customerController=require("./customer.controller");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/getallpackages',customerController.allpackages);

module.exports=router;