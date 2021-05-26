const {
  generateResponse,
  createError,
  createSuccessMessage,
} = require("../../../utils/response");

const Package = require("../../package/package.model");
const Safehouse = require("../../safeHouse/safeHouse.model");

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

module.exports = assignToSafehouse = async (req, res) => {
  let packageid = req.query.packageid;
  let safehouseid = req.query.safehouseid;
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
