const {
    generateResponse,
    createError,
    createSuccessMessage,
  } = require("../../../utils/response");

const Package=require("../../package/package.model");
module.exports.getallpackages=async (req,res)=>{
        let packages=await Package.find({}).exec();
        let result = generateResponse(200, createSuccessMessage(packages));
        return res.status(result.status).json(result.result);
    }