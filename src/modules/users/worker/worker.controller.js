const {
    generateResponse,
    createError,
    createSuccessMessage,
  } = require("../../../utils/response");
  
  const Package = require("../../package/package.model");
  const Safehouse = require("../../safeHouse/safeHouse.model");
  const User=require("../users.model");

  module.exports.getallpackages=(req,res)=>{
    let safeboxid = req.params.safeboxid;
    let safebox = await Safebox.findById(safeboxid).exec();
    if (!safebox) {
      let result = generateResponse(
        404,
        createError("safebox does not exist")
      );
      return res.status(result.status).json(result.result);
    } else {
      let user=await User.findById(req.userid).exec();
      if(user.safeBox!==safeboxid){
        let result=generateResponse(401,createError("unauthorized"));
        return res.status(result.status).json(result.result);
      }else{
          let packages=await Package.find({safeBox:safeboxid}).exec();
          let result = generateResponse(200, createSuccessMessage(packages));
      return res.status(result.status).json(result.result);
      }
    }
  }