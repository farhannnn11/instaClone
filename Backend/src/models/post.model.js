const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    imgUrl:{
        type:String,
        required:[true,'imgUrl is required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userId is required"]
    },
    caption:{
        type:String,
        default:""
    }
},{timestamps:true})

const postModel = mongoose.model("posts",postSchema)
module.exports = postModel