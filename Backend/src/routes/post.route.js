const express= require("express")
const postRouter = express.Router()

const postControl = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})


postRouter.post("/",upload.single("image"),identifyUser,postControl.createPostController)
postRouter.get("/",identifyUser,postControl.getPostController)
postRouter.get("/feed",identifyUser,postControl.getPostFeedController)
postRouter.get("/:postId",identifyUser,postControl.getPostBySearch)
postRouter.post("/like/:postId",identifyUser,postControl.likeController)
postRouter.post("/unlike/:postId",identifyUser,postControl.unlikeController)

module.exports = postRouter