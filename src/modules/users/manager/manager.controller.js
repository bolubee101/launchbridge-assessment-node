const {
    generateResponse,
    createError,
    createSuccessMessage,
  } = require("../../../utils/response");
  
  const Package = require("../../package/package.model");
  const Safehouse = require("../../safeHouse/safeHouse.model");
  const Safebox=require("../../safebox/safeBox.model")

  module.exports.getallpackages = async (req, res) => {
    let safeHouseid=req.params.safehoseid;
    let safehouse=await Safehouse.findById(safeHouseid).exec();
    if(safehouse.managedBy!==req.userid){
        let result=generateResponse(401,createError("unauthorized"));
        return res.status(result.status).json(result.result);
    }
    if (!safehouse) {
        let result = generateResponse(404, createError("safehouse does not exist"));
        return res.status(result.status).json(result.result);
      }
    if (req.query.status == "unassigned") {
        let packages = await Packages.find({ safeHouse: safehouseid }).where("safeBox").ne(null).exec();
        let result = generateResponse(200, createSuccessMessage(packages));
        return res.status(result.status).json(result.result);
    }else {
      let packages = await Packages.find({ safeHouse: safehouseid }).exec();
      let result = generateResponse(200, createSuccessMessage(packages));
      return res.status(result.status).json(result.result);
    }
  };

  module.exports.getallsafeboxes = async (req, res) => {
    let safeHouseid=req.params.safehoseid;
    let safehouse=await Safehouse.findById(safeHouseid).exec();
    if(safehouse.managedBy!==req.userid){
        let result=generateResponse(401,createError("unauthorized"));
        return res.status(result.status).json(result.result);
    }
    if (!safehouse) {
        let result = generateResponse(404, createError("safehouse does not exist"));
        return res.status(result.status).json(result.result);
      }
    let safeboxes = await Safebox.find({safeHouse:safehouseid}).exec();
    let result = generateResponse(200, createSuccessMessage(safeboxes));
    return res.status(result.status).json(result.result);
  };

  module.exports.assigntobox=async(req,res)=>{
    let safeHouseid=req.params.safehoseid;
    let safehouse=await Safehouse.findById(safeHouseid).exec();
    if(safehouse.managedBy!==req.userid){
        let result=generateResponse(401,createError("unauthorized"));
        return res.status(result.status).json(result.result);
    }

    let packageid = req.body.packageid;
    let safeboxid = req.params.safeboxid;
    let package = await Package.findById(packageid).exec();
    if (!package) {
      let result = generateResponse(404, createError("Package does not exist"));
      return res.status(result.status).json(result.result);
    } else {
      let safebox = await Safebox.findById(safeboxid).exec();
      if (!safebox) {
        let result = generateResponse(
          404,
          createError("safebox does not exist")
        );
        return res.status(result.status).json(result.result);
      } else {
        package.safeBox = safeboxid;
        package = await package.save();
        let result = generateResponse(200, createSuccessMessage(package));
        return res.status(result.status).json(result.result);
      }
    }
  }