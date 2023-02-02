import { MoreVert } from "@mui/icons-material";
import { useState,useEffect} from "react";
import "./post.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRef } from "react";



export default function Post({fetchtimelinePosts, post }) {
  const inputOne = useRef()
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [followingPost, setFollowingPost] = useState()
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const Allfollowingsdata = async () => {

    if(post.length){
     try {
      if(post[0].userid){
   
        const res = await axios.get(`api/users/getUser/${post[0].userid}`);

       if(res){
        // console.log(res.data);
         setFollowingPost(res.data)
        }
      }
      } catch (error) {
      console.log(error.message)
     }
    }
  };
  
  useEffect(() => {
    Allfollowingsdata();
  },[]);
  
 
  const handlePostDelete = async(post) => {
  try {
    console.log(post._id);
    if(!post._id){
      return 
    }
    const res = await axios.delete(`/api/posts/delete/${post._id}`)
    console.log(res);
    fetchtimelinePosts()
    
    
  } catch (error) {
    console.log(error.message);
  }
  }

  
  return (
    <>
    
      {post &&
        post.map((post) => (
          <div className="post">
            <div className="postWrapper">
              <div  className="postTop">
             
                <div  className="postTopLeft">
   

                  <Link to={`/profile?username=${followingPost&&followingPost.username}&_id=${followingPost&&followingPost._id}`}>

                  <div className=" flex flex-row align-center">
                  <img
                    className="postProfileImg"
                      src={followingPost&&followingPost.profilePicture?(followingPost.profilePicture):(require('../../assets/white_profile_picture.png'))}
                    alt=""
                  />
                  <span className="postUsername">
                    {followingPost&&followingPost.username}
                  </span>
                  </div>

                  </Link>
                  <span className="postDate">{post.createdAt.slice(11,19)} on {(post.createdAt.slice(0,10))}</span>
                </div>
                <div  className="postTopRight flex flex-col">
                 
                 <div  className="">
                  <button onClick={()=>handlePostDelete(post)}
                  className=" "
                  >Delete</button>
                  
                  </div> 
              
                </div>
              </div>
              <div className="postCenter">
             
                <span className="postText">{post.description?(post.description):(" ")}</span>
                <img className="postImg" src={post.img&&post.img.secure_url} alt="" />
              </div>
             
              <div className="postBottom">
                <div className="postBottomLeft space-x-2">
                  <img
                    className="likeIcon"
                    src={require("../../assets/like.png")}
                    onClick={likeHandler}
                    width="25px"
                    alt=""
                  />

                  <span className="postLikeCounter ">
                    {post.likes.length}
                  </span>
                </div>
                <div className="postBottomRight">
                  <span className="postCommentText">
                    {post.comment} comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
