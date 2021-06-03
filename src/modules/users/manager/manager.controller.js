const {
  generateResponse,
  createError,
  createSuccessMessage,
} = require("../../../utils/response");

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../config/configuration");

const Package = require("../../package/package.model");
const Safehouse = require("../../safeHouse/safeHouse.model");
const Safebox = require("../../safebox/safeBox.model");
const User=require("../users.model");

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let hash = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hash, role: "manager" });
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
  let safehouseid = req.params.safehouseid;
  let safehouse = await Safehouse.findById(safehouseid).exec();
  if (safehouse.managedBy !== req.userid) {
    let result = generateResponse(401, createError("unauthorized"));
    return res.status(result.status).json(result.result);
  }
  if (!safehouse) {
    let result = generateResponse(404, createError("safehouse does not exist"));
    return res.status(result.status).json(result.result);
  }
  if (req.query.status == "unassigned") {
    let packages = await Packages.find({ safeHouse: safehouseid })
      .where("safeBox")
      .ne(null)
      .exec();
    let result = generateResponse(200, createSuccessMessage(packages));
    return res.status(result.status).json(result.result);
  } else {
    let packages = await Packages.find({ safeHouse: safehouseid }).exec();
    let result = generateResponse(200, createSuccessMessage(packages));
    return res.status(result.status).json(result.result);
  }
};

module.exports.getallsafeboxes = async (req, res) => {
  let safehouseid = req.params.safehouseid;
  let safehouse = await Safehouse.findById(safehouseid).exec();
  if (safehouse.managedBy !== req.userid) {
    let result = generateResponse(401, createError("unauthorized"));
    return res.status(result.status).json(result.result);
  }
  if (!safehouse) {
    let result = generateResponse(404, createError("safehouse does not exist"));
    return res.status(result.status).json(result.result);
  }
  let safeboxes = await Safebox.find({ safeHouse: safehouseid }).exec();
  let result = generateResponse(200, createSuccessMessage(safeboxes));
  return res.status(result.status).json(result.result);
};

module.exports.assigntobox = async (req, res) => {
  let safehouseid = req.params.safehouseid;
  let safehouse = await Safehouse.findById(safehouseid).exec();
  if (safehouse.managedBy !== req.userid) {
    let result = generateResponse(401, createError("unauthorized"));
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
      let result = generateResponse(404, createError("safebox does not exist"));
      return res.status(result.status).json(result.result);
    } else {
      package.safeBox = safeboxid;
      package = await package.save();
      let result = generateResponse(200, createSuccessMessage(package));
      return res.status(result.status).json(result.result);
    }
  }
};

module.exports.assignWorker = async (req, res) => {
  let worker = req.body.manager;
  let safeboxid = req.body.safeboxid;
  if (!worker || !safeboxid) {
    let result = generateResponse(
      400,
      createError("no selected worker or safebox")
    );
    return res.status(result.status).json(result.result);
  } else {
    try {
      let safehouseid = req.params.safehouseid;
      let safehouse = await Safehouse.findById(safehouseid).exec();
      if (safehouse.managedBy !== req.userid) {
        let result = generateResponse(401, createError("unauthorized"));
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
          if (safebox.safeHouse != safehouseid) {
            let result = generateResponse(401, createError("unauthorized"));
            return res.status(result.status).json(result.result);
          } else {
            let user = await User.findById(worker).exec();
            if (!user) {
              let result = generateResponse(
                400,
                createError("worker does not exist")
              );
              return res.status(result.status).json(result.result);
            } else {
              if (user.role != "worker") {
                let result = generateResponse(
                  400,
                  createError("User not a worker")
                );
                return res.status(result.status).json(result.result);
              } else {
                if (user.safeHouse != safehouseid) {
                  let result = generateResponse(
                    400,
                    createError("User does not belong to this safe house")
                  );
                  return res.status(result.status).json(result.result);
                }
                safehouse.workers.push(user._id);
                safebox.worers.push(user._id);
                user.safeBox = safebox._id;
                await safehouse.save();
                await user.save();
                let result = generateResponse(
                  200,
                  createSuccessMessage(safehouse)
                );
                return res.status(result.status).json(result.result);
              }
            }
          }
        }
      }
    } catch (err) {
      let result = generateResponse(400, createError(err.message));
      return res.status(result.status).json(result.result);
    }
  }
};

module.exports.getworkers=async (req,res)=>{
  let safeHouse=req.params.safehouseid;
let safeBox=req.query.safebox;
if(safeBox){
  let users=await User.find({safeBox}).exec();
  let result = generateResponse(
    200,
    createSuccessMessage(users)
  );
  return res.status(result.status).json(result.result);
}else{
  let users=await User.find({safeHouse}).exec();
  let result = generateResponse(
    200,
    createSuccessMessage(users)
  );
  return res.status(result.status).json(result.result);
}
}

