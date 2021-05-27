const express = require('express');
const apiRouter = express.Router();

let adminroutes=require("./users/admin/admin.routes");
let verifyadmin=require("./users/admin/admin.middleware");
let managerroutes=require("./users/manager/manager.routes");
let verifymanager=require("./users/manager/manager.middleware");




apiRouter.use('/admin', verifyadmin,adminroutes)
apiRouter.use('/manager', verifymanager,managerroutes)


apiRouter.get('*', (req, res) => {
    res.status(404);
    return res.json({
      errorMessage: 'endpoint not found',
    });
  });
  
  apiRouter.post('*', (req, res) => {
    res.status(404);
    return res.json({
      errorMessage: 'endpoint not found',
    });
  });
  
  apiRouter.put('*', (req, res) => {
    res.status(404);
    return res.json({
      errorMessage: 'endpoint not found',
    });
  });
  
  apiRouter.delete('*', (req, res) => {
    res.status(404);
    return res.json({
      errorMessage: 'endpoint not found',
    });
  });
  
  module.exports = apiRouter;