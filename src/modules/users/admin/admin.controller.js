const {
  generateResponse,
  createError,
  createSuccessMessage,
} = require("../../../utils/response");

const Package = require("../../package/package.model");
const Safehouse = require("../../safeHouse/safeHouse.model");
const User = require("../../users/users.model");

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let hash = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hash, role: "admin" });
    await user.save();
    var token = jwt.sign({ userid: user._id }, config.jwtsecret);
    result = generateResponse(200, createSuccessMessage({ token, user }));
    return res.status(result.status).json(result.result);
  } catch (err) {
    result = generateResponse(400, createError(err.message));
    return res.status(result.status).json(result.result);
  }
};

module.exports.getallpackages = async (req, res) => {
  if (req.query.status == "unassigned") {
    let packages = await Package.where("safeHouse").ne(null).exec();
    let result = generateResponse(200, createSuccessMessage(packages));
    return res.status(result.status).json(result.result);
  }
  let packages = await Package.find({}).exec();
  let result = generateResponse(200, createSuccessMessage(packages));
  return res.status(result.status).json(result.result);
};

module.exports.getallsafehouses = async (req, res) => {
  let safehouses = await Safehouse.find({}).exec();
  let result = generateResponse(200, createSuccessMessage(safehouses));
  return res.status(result.status).json(result.result);
};

module.exports.safeHousepackages = async (req, res) => {
  let safehouseid = req.params.safehouseid;
  let safehouse = await Safehouse.findById(safehouseid).exec();
  if (!safehouse) {
    let result = generateResponse(404, createError("safehouse does not exist"));
    return res.status(result.status).json(result.result);
  } else {
    let packages = await Packages.find({ safeHouse: safehouseid }).exec();
    let result = generateResponse(200, createSuccessMessage(packages));
    return res.status(result.status).json(result.result);
  }
};

module.exports.assignToSafehouse = async (req, res) => {
  let packageid = req.body.packageid;
  let safehouseid = req.params.safehouseid;
  let package = await Package.findById(packageid).exec();
  if (!package) {
    let result = generateResponse(404, createError("Package does not exist"));
    return res.status(result.status).json(result.result);
  } else {
    let safehouse = await Safehouse.findById(safehouseid).exec();
    if (!safehouse) {
      let result = generateResponse(
        404,
        createError("safehouse does not exist")
      );
      return res.status(result.status).json(result.result);
    } else {
      package.safeHouse = safehouseid;
      package = await package.save();
      let result = generateResponse(200, createSuccessMessage(package));
      return res.status(result.status).json(result.result);
    }
  }
};

module.exports.createSafehouse = async (req, res) => {
  let safehouse = new Safehouse({});
  safehouse = safehouse.save();
  let result = generateResponse(200, createSuccessMessage(safehouse));
  return res.status(result.status).json(result.result);
};
module.exports.finduser = async (req, res) => {
  let role = req.query.role;
  try {
    if (role) {
      let users = await User.find({ role }).exec();
      let result = generateResponse(200, createSuccessMessage(users));
      return res.status(result.status).json(result.result);
    } else {
      let users = await User.find({}).exec();
      let result = generateResponse(200, createSuccessMessage(users));
      return res.status(result.status).json(result.result);
    }
  } catch (err) {
    let result = generateResponse(400, createError(err.message));
    return res.status(result.status).json(result.result);
  }
};

module.exports.assignManager=async(req,res)=>{
  let manager=req.body.manager;
  let safehouseid=req.params.safehouseid;
  if(!manager){
    let result = generateResponse(400, createError("no selected manager"));
    return res.status(result.status).json(result.result);
  }else{
    try {
      let safehouse=await Safehouse.findById(safehouseid).exec();
      if(!safehouse){
        let result = generateResponse(400, createError("safehouse does not exist"));
        return res.status(result.status).json(result.result);
      }else if(safehouse.managedBy){
        let result = generateResponse(400, createError("Safehouse is already"));
        return res.status(result.status).json(result.result);
      }else{
        let user=await User.findById(manager).exec();
        if(!user){
          let result = generateResponse(400, createError("manager does not exist"));
        return res.status(result.status).json(result.result);
        }else{
          if(user.role!="manager"){
            let result = generateResponse(400, createError("User not a manager"));
        return res.status(result.status).json(result.result);
          }else{
            safehouse.managedBy=user._id;
            user.safeHouse=safehouse._id;
            await safehouse.save();
            await user.save();
            let result = generateResponse(200, createSuccessMessage(safehouse));
            return res.status(result.status).json(result.result);
          }
        }
      }
    } catch (err) {
      let result = generateResponse(400, createError(err.message));
        return res.status(result.status).json(result.result);
    }
  
  }
}
module.exports.assignWorker=async(req,res)=>{
  let worker=req.body.worker;
  let safehouseid=req.params.safehouseid;
  if(!worker){
    let result = generateResponse(400, createError("no selected worker"));
    return res.status(result.status).json(result.result);
  }else{
    try {
      let safehouse=await Safehouse.findById(safehouseid).exec();
      if(!safehouse){
        let result = generateResponse(400, createError("safehouse does not exist"));
        return res.status(result.status).json(result.result);
      }else if(safehouse.managedBy){
        let result = generateResponse(400, createError("Safehouse is already"));
        return res.status(result.status).json(result.result);
      }else{
        let user=await User.findById(worker).exec();
        if(!user){
          let result = generateResponse(400, createError("worker does not exist"));
        return res.status(result.status).json(result.result);
        }else{
          if(user.role!="worker"){
            let result = generateResponse(400, createError("User not a worker"));
        return res.status(result.status).json(result.result);
          }else{
            safehouse.workers.push(user._id);
            user.safeHouse=safehouse._id;
            await safehouse.save();
            await user.save();
            let result = generateResponse(200, createSuccessMessage(safehouse));
            return res.status(result.status).json(result.result);
          }
        }
      }
    } catch (err) {
      let result = generateResponse(400, createError(err.message));
        return res.status(result.status).json(result.result);
    }
  
  }
}
module.exports.getallusers=async (req,res)=>{
  let role=req.query.role;
  try {
    if(role){
      let user = await User.find({role}).exec();
      let result = generateResponse(200, createSuccessMessage(user));
            return res.status(result.status).json(result.result);
    }else{
      let user = await User.find({}).exec();
      let result = generateResponse(200, createSuccessMessage(user));
            return res.status(result.status).json(result.result);
    }
  } catch (error) {
    let result = generateResponse(400, createError(err.message));
        return res.status(result.status).json(result.result);
  }
}