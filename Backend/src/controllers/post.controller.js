const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/likes.model");
const userModel = require("../models/user.model");
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
  });
  const post = await postModel.create({
    imgUrl: file.url,
    userId: req.user.id,
    caption: req.body.caption,
  });

  res.status(200).json({
    message: "Post Uploaded Successfully",
    post,
  });
};

const getPostController = async (req, res) => {
  const user = req.user._id;

  const postFound = await postModel.find({ userId: user });
  if (!postFound) {
    return res.status(400).json({
      message: "No Posts",
    });
  }
  res.status(200).json({ message: "Post fetched Successfully", postFound });
};

const getPostBySearch = async (req, res) => {
  const searchUser = req.user._id;
  const searchedPost = req.params.postId;

  const post = await postModel.findById(searchedPost);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const isMatched = post.userId.toString() === searchUser.toString();
  if (!isMatched) {
    return res.status(401).json({
      message: "The post is forbidden",
    });
  }
  res.status(200).json({ message: "post fetched successfully", post });
};

const likeController = async (req, res) => {
  const user = req.user._id;
  const postLike = req.params.postId;

  const isAlreadyLiked = await likeModel.findOne({
    user: user,
    postId: postLike,
  });
  if (isAlreadyLiked) {
    return res.status(401).json({ message: "U have already liked this post" });
  }

  const like = await likeModel.create({
    user: user,
    postId: postLike,
  });

  res.status(200).json({
    message: "You liked this post",
  });
};

const unlikeController = async (req,res)=>{
  const user = req.user.id
  const postId =req.params.postId
 const isLiked = await likeModel.findOneAndDelete({
    user:user,
    postId:postId
  })

  res.status(200).json({
    message:"Post unliked"
  })

}

const getPostFeedController = async (req,res)=>{
  const user =  req.user._id
  const post = await Promise.all((await postModel.find().populate("userId").lean())
  .map(async(elems)=>{

    const isLiked  = await likeModel.findOne({user:user,postId:elems._id})
    elems.isLiked = Boolean(isLiked)

    return elems 
  }))
  

  res.status(200).json({
    message:"post fetched",post
  })
}
module.exports = {
  createPostController,
  getPostController,
  getPostBySearch,
  likeController,
  unlikeController,
  getPostFeedController
};
