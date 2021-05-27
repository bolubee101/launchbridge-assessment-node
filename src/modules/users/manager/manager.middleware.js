const { jwtsecret } = require('../../../config/configuration');
const {verify} = require('jsonwebtoken');
const {
    generateResponse,
    createError,
    createSuccessMessage,
  } = require("../../../utils/response");

const verifyToken = async (req, res, next) => {
  const tokenHeader = req.headers['authorization']
  if (typeof tokenHeader !== 'undefined') {
      const token = tokenHeader.split(' ')[1]
      try {
        const data = await verify(token, jwtsecret)
        req.userid = data.userid
        if(data.role!=="manager"){
            let result=generateResponse(401,createError("unauthorized"));
            return res.status(result.status).json(result.result);
        }else next();
      } catch (error) {
        console.log(error.message)
        let result=generateResponse(400,createError("unable to verify user"));
        return res.status(result.status).json(result.result);
      }
  } else {
    let result=generateResponse(401,createError("unauthorized"));
        return res.status(result.status).json(result.result);
  }
}

module.exports.verifyToken = verifyToken