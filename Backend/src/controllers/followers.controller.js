const followModel = require("../models/follower.model");
const userModel = require("../models/user.model");

const followController = async (req, res) => {
  const followerUsername = req.user.username;
  const followingUsername = req.params.username;

  const isUserExists = await userModel.findOne({ username: followingUsername });
  if (!isUserExists) {
    return res.status(404).json({ message: "user not found" });
  }
  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });

  if (isFollowing) {
    return res.status(401).json({
      message: "You are already following",
    });
  }
  const follow = await followModel.create({
    follower: followerUsername,
    following: followingUsername,
  });

  const isAccepted = await followModel.findOneAndUpdate(
    { follower: followerUsername, following: followingUsername },
    { status: "accepted" },
  );

  if (!isAccepted) {
    await followModel.updateOne({ status: "pending" });
  }
  //   await followModel.updateOne({status:"accepted"})
  res.status(200).json({
    message: `you started following ${followingUsername}`,
  });
};

const unfollowController = async (req, res) => {
  const loggedInUser = req.user.username;
  const unfollowUser = req.params.username;

    const isUserExists = await userModel.findOne({username:unfollowUser})
    if(!isUserExists){
        return res.status(404).json({
            message:"user not found"
        })
    }
  const isFollowing = await followModel.findOne({ follower: loggedInUser, following: unfollowUser });
  if(!isFollowing){
    return res.status(403).json({
        message:"you are not following this user"
    })
  }

  await followModel.findOneAndUpdate(
    {
      follower: loggedInUser,
      following: unfollowUser,
    },
    { status: "rejected" },
  );

  await followModel.findOneAndDelete({
    follower: loggedInUser,
    following: unfollowUser,
  });

  res.status(202).json({
    message: `You have unfollowed ${unfollowUser}`,
  });
};



module.exports = { followController, unfollowController };
