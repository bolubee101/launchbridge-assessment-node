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
  const User=require("../users.model");


  module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let hash = await bcrypt.hash(password, 10);
      let user = new User({ name, email, password: hash, role:"worker" });
      await user.save();
      var token = jwt.sign({ userid:user._id,role: user.role  }, config.jwtsecret);
      result = generateResponse(200, createSuccessMessage({ token, user }));
      return res.status(result.status).json(result.result);
    } catch (err) {
      result = generateResponse(400, createError(err.message));
      return res.status(result.status).json(result.result);
    }
  };

  module.exports.getallpackages=async (req,res)=>{
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