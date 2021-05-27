const {
  generateResponse,
  createError,
  createSuccessMessage,
} = require("../../utils/response");
let Package = require("./package.model");

module.exports.createpackage = async (req, res) => {
  let { packageName } = req.body;

  if (!packageName) {
    let result = generateResponse(400, createError("input package name"));
    return res.status(result.status).json(result.result);
  }
  
  let package = new Package({ packageName, registeredTo: req.userid });
   package = await package.save();
  let result = generateResponse(201, createSuccessMessage(package));
  return res.status(result.status).json(result.result);
};

module.exports.findpackagebyid=async (req,res)=>{
    let packageid=req.params.packageid;
    let package=await Package.findById(packageid).exec();
    if(!package){
        let result = generateResponse(404, createError("Package does not exist"));
        return res.status(result.status).json(result.result);
    }else{
        if(package.registeredTo.toString()!==req.userid.toString()){
            let result = generateResponse(401, createError("unauthorized access"));
            return res.status(result.status).json(result.result);
        }else{
            let result = generateResponse(200, createSuccessMessage(package));
            return res.status(result.status).json(result.result);
        }
    }
}
