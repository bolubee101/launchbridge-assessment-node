const {Schema,model} = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
      type:String,
      enum:['admin','manager','worker','customer'],
      default:"customer"
  },
  safeBox:{
    type:Schema.Types.ObjectId
  },
  safeHouse:{
    type:Schema.Types.ObjectId
  }
},{
  timestamps: true
});

userSchema.pre("save",function(next){
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();
  return next();
})

module.exports = model("User",userSchema);