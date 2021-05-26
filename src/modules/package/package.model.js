const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  packageName:{
      type:String,
      required:true,
  },
  registeredTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  safeHouse:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'safeHouse',
  },
  safeBox:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'safeBox'
  }
},{
  timestamps: true
});

packageSchema.pre("save",function(next){
  this.packageName = this.packageName.toLowerCase();
  return next();
})

module.exports = mongoose.model("Package",packageSchema);