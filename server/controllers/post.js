const Postmodel = require("../models/Postmodel")


// create a post
// 
exports.makeAPost = async (req,res)=>{
   req.body.userid = req.user._id
  const newPost = new Postmodel(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

// update a post
//here the id which we are providing in params is of post id
exports.update = async (req,res)=>{
   if(!req.body.description){
    return res.status(404).send("please provide description")
   }
  const post = await Postmodel.findById(req.params.id);
  if(!post){
    return res.status(404).send("post not found")
  }
  try {
    await post.updateOne({$set:req.body}); 
    res.status(200).send("Post has been updated")
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }

}
// delete a post
exports.deletePost = async (req,res)=>{

 const post = await Postmodel.findById(req.params.id);
 if(!post){
   return res.status(404).send("post not found")
 }
 try {
   await post.deleteOne(); 
   res.status(200).send("Post has been deleted")
 } catch (error) {
   res.status(500).json({
     success:false,
     message:error.message,
   })
 }

}

// like a post
// the id in params is of post a 
// hm kisi dusre user ki bhi post ko search kr skte h by id in params
exports.likePost = async(req,res)=>{
try {
   
   const post =await Postmodel.findById(req.params.id)
   
   if(!post){
   return res.status(400).send("post not found")
   }
   //we are using req.user._id beacuse kahi hamne pehle se post ko like toh nahi kr rakha
   if(!post.likes.includes(req.user._id)){
    await post.updateOne({$push:{likes:req.user._id}})
    return res.status(200).send("You have like the post");
   }else{
    await post.updateOne({$pull:{likes:req.user._id}})
    return res.status(200).send("You have unlike the post");
     
   }
  
} catch (error) {
  res.status(500).json({
    success:false,
    message:error.message
  })
}
} 

// get a post
// here id in params is of a perticular post we want
exports.getPost = async(req,res)=>{
    try {
      const post =await Postmodel.findById(req.params.id)
      if(post){
       return res.status(200).json({
          success:true,
          message:post
        })
      }
     else{
     return res.status(400).send("post not found")
     }
    } catch (error) {
      res.status(200).json({
        success:false,
        message:error.message
    })
}}


// get timline posts
exports.timelinePosts = async(req,res)=>{
  try {
      const currentUserPosts = await Postmodel.find({userid:req.user._id})
       
      const friendPosts = await Promise.all(
        req.user.followings.map((friendsId)=>{
       return  Postmodel.find({userid:friendsId})
      }))
      res.status(200).json(currentUserPosts.concat(...friendPosts))
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}