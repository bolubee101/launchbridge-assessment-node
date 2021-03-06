const joi = require("joi");
const User = require("../users/users.model");
const {generateResponse,createError, getErrorFromJoiFormat} = require("../../utils/response")


const opts = {abortEarly:false}

const signInValidatorSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required()
})

exports.signInValidator = async function (req,res,next){
  try {
    req.body = await signInValidatorSchema.validateAsync(req.body,opts);
    return next();
  } catch (err) {
    const errors = getErrorFromJoiFormat(err);
    return next(generateResponse(400,createError(errors)));
  }
}

const signupValidatorSchema = joi.object().keys({
  name:joi.string().required(),
  email:joi.string().email().required(),
  password: joi.string().required(),
})
exports.signUpValidator = async function (req,res,next){
  try {
    req.body = await signupValidatorSchema.validateAsync(req.body,opts);
    return next();
  } catch (err) {
    const errors = getErrorFromJoiFormat(err)
    return next(generateResponse(400,createError(errors)))
  }
}


exports.verifyUniqueDetails = async function(req,res,next){
  const possibleErrors = ["email already exists"];
  const errors = [];
  (
    await Promise.all([
      User.find({email:req.body.email.toLowerCase()}),
    ])
  ).forEach((values,i)=>{
    if(values.length > 0)errors.push(possibleErrors[i]);
  })

  if (errors.length) return next(generateResponse(400,createError(errors)))

  return next();
}