const Package=require("../../package/package.model");

module.exports.allpackages=(req,res)=>{
let packages=Package.find({registeredTo:req.body.userid}).exec();
let result = generateResponse(200, createSuccessMessage(packages));
return res.status(result.status).json(result.result);
}