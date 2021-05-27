const express = require('express');
const apiRouter = express.Router();

let adminroutes=require("./users/admin/admin.routes");
let verifyadmin=require("./users/admin/admin.middleware").verifyToken;

let managerroutes=require("./users/manager/manager.routes");
let verifymanager=require("./users/manager/manager.middleware").verifyToken;

let workerroutes=require("./users/worker/worker.routes");
let verifyworker=require("./users/worker/worker.middleware").verifyToken;

let customerroutes=require("./users/customer/customer.routes");

let packageroutes=require("./package/package.routes");
let verifyuser=require("./users/verifyToken").verifyToken;

let authroutes=require("./auth/auth.routes");


apiRouter.use('/auth',authroutes);
apiRouter.use('/admin', verifyadmin,adminroutes);
apiRouter.use('/manager', verifymanager,managerroutes);
apiRouter.use('/worker',verifyworker,workerroutes);
apiRouter.use('/customer',verifyuser,customerroutes);

apiRouter.use('/package',verifyuser,packageroutes);


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