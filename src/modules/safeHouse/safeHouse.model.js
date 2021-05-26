const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  managedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Manager',
  }
},{
  timestamps: true
});


module.exports = mongoose.model("SafeHouse",houseSchema);