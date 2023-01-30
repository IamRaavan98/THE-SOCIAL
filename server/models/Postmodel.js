const mongoose = require("mongoose");

const PostSchmea = new mongoose.Schema(
    {
     userid:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        max:500,
     },
     img:{
        type:String,
     },
     likes:{
        type:Array,
        default:[]
     },
    },
  { timestamps: true }
);

module.exports = mongoose.model("Postmodel", PostSchmea);
