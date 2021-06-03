const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boxSchema = new Schema({
  workers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref:'Worker',
  },
  safeHouse:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'safeHouse',
  },
},{
  timestamps: true
});


module.exports = mongoose.model("SafeBox",boxSchema);