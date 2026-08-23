const express = require("express")
const followRouter = express.Router()
const identifyUser =  require("../middlewares/auth.middleware")
const followController = require("../controllers/followers.controller")
followRouter.post("/follow/:username",identifyUser,followController.followController)
followRouter.post("/unfollow/:username",identifyUser,followController.unfollowController)
module.exports=followRouter