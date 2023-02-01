const express = require("express");
const postRoutes = express.Router();
const { checkLoginOrNot } = require("../middleware/auth");
const { makeAPost, 
        update,
        deletePost,
        likePost, 
        getPost,
        timelinePosts,
        userAllPosts} = require("../controllers/post")

postRoutes.post("/makeAPost",checkLoginOrNot,makeAPost)
postRoutes.get("/:id/update",checkLoginOrNot,update)
postRoutes.get("/:id/delete",checkLoginOrNot,deletePost)
postRoutes.put("/:id/LikePost",checkLoginOrNot,likePost)
postRoutes.get("/:id/getPost",checkLoginOrNot,getPost)
postRoutes.get("/timelinePosts",checkLoginOrNot,timelinePosts)
postRoutes.get("/userAllPosts",checkLoginOrNot,userAllPosts)

module.exports = postRoutes;