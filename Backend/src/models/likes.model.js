const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"posts",
    require:[true,"postId is required"]
  },
},{timestamps:true});

likeSchema.index({user:1,postId:1},{unique:true})
const likeModel =mongoose.model("likes",likeSchema)
module.exports = likeModel