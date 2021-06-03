const {
  generateResponse,
  createError,
  createSuccessMessage,
} = require("../../utils/response");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../users/users.model");
const config = require("../../config/configuration");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("invalid email or password");
    } else {
      if (await bcrypt.compare(password, user.password)) {
         user.password="n/a";
        let token = jwt.sign({ userid:user._id, role: user.role }, config.jwtsecret);
        result = generateResponse(200, createSuccessMessage({ token, user }));
        return res.status(result.status).json(result.result);
      } else {
        result = generateResponse(
          400,
          createError("invalid email or password")
        );
        return res.status(result.status).json(result.result);
      }
    }
  } catch (err) {
    result = generateResponse(400, createError(err.message));
    return res.status(result.status).json(result.result);
  }
};
module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let hash = await bcrypt.hash(password, 10);
    let user = new User({ name, email, password: hash });
    await user.save();
    var token = jwt.sign({ userid:user._id,role: user.role  }, config.jwtsecret);
    result = generateResponse(200, createSuccessMessage({ token, user }));
    return res.status(result.status).json(result.result);
  } catch (err) {
    result = generateResponse(400, createError(err.message));
    return res.status(result.status).json(result.result);
  }
};
