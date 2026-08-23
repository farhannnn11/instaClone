const mongoose = require("mongoose")


const followSchema = new mongoose.Schema({
    follower:{
        type:String,
    },
    following:{
        type:String,
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected"]
    }
    
},{timestamps:true})

followSchema.index({follower:1,following:1},{unique:true})
const followModel = mongoose.model("follow",followSchema)
module.exports=followModel