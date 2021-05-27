const dotenv = require('dotenv')

dotenv.config()
// This should be your own database url
module.exports = {
  database:
    process.env.DATABASE||"mongodb://mongo:27018/launch",
  jwtsecret: process.env.SECRET||"secret-key-test",
};