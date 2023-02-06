// import { Person, Search } from "@mui/icons-material";
import "./topbar.css";
import { CircularProgress } from "@mui/material";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import Authcontext from "../../context/Authcontext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//we will use context api data of user which is stored at the time of login as we will go from here to profile page

export default function Topbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  //using context
  const [userData, setUserData] = useState(useContext(Authcontext).data.user);

  const { dispatch } = useContext(Authcontext);
 
  const [searchArray1,setSearchArray1] = useState([])
  const [searchArray2,setSearchArray2] = useState([])

  const [imageUplaodLoading, setImageUploadloading] = useState(0);
  const [searchInput, setSearchInput] = useState([]);
  const [profilebar, setProfileBar] = useState("none");

  
  const handleLogout = async () => {
    try {
      const res = await axios.get(`/api/users/logout`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfilepicture = () => {
    if (profilebar === "none") {
      setProfileBar("flex");
    } else {
      setProfileBar("none");
    }
  };

  useEffect(()=>{

  })

  // uplaod a picture
  const handleProfilePictureUpload = async (e) => {
    setImageUploadloading(1);
    e.preventDefault();
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      try {
        const formData = new FormData();
        formData.append("photos", e.target.files[0]);
        const res = await axios.post(`/api/posts/addProfilePicture`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          setImageUploadloading(0);

          setUserData(res.data.user);
          // as we are fetching data from context api and there it store its data in local host so we need to update it manually or it will update as on login
          dispatch({
            data: res.data,
          });
        }
      } catch (error) {
        setImageUploadloading(0);
        console.log(error.message);
        console.log(error);
      }
    } else {
      setImageUploadloading(0);
      window.alert("image not found");
    }
  };

  // all user name list
  const handleFriendList = async () => {
   
    try {
      const res = await axios.get(`/api/users/AlluserList`);
      console.log(res.data.message);
      // setSearchArray1(res.data.message.map((r)=> console.log(r.username)))
      setSearchArray1(res.data.message)
    } catch (error) {
      console.log(error.message);
    }
  

 }

 const handleSearch = (e)=>{
  e.preventDefault()
      
    
 }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">THE SOCIAL</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <form onSubmit={handleSearch}>

          <label htmlFor="search">
            <button id="search" type="submit">
            <Search  className="searchIcon" />
            </button>
            <input
              type="text"
              onChange = {(e)=>setSearchInput(e.target.value)}
              onClick = {handleFriendList}
              id="search"
              placeholder="Search for friend, post or video"
              className="searchInput"
              />
          </label>
        </form>
        </div>
      </div>
      <div className="flex flex-row topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">
            <button>
              <Link
                to={`/profile?username=${
                  userData.username && userData.username
                }&_id=${userData._id && userData._id}`}
              >
                My Profile
              </Link>
            </button>
          </span>

          <span className="topbarLink">
            <Link to="/home">Timeline</Link>
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <div onClick={handleProfilepicture} className="flex flex-col ">
          {imageUplaodLoading ? (
            <CircularProgress />
          ) : (
            <img
              src={
                userData.profilePicture.secure_url
                  ? userData.profilePicture.secure_url
                  : require("../../assets/white_profile_picture.png")
              }
              alt=""
              className="topbarImg"
            />
          )}

          <div
            onClick={handleProfilepicture}
            style={{ display: `${profilebar}` }}
            className="fixed top-[50px] right-[20px] flex flex-col bg-[#1877F2] items-start "
          >
            <label className="px-4 py-1" htmlFor="posts">
              <span className="cursor-pointer  hover:bg-slate-500">
                Change Profile
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="posts"
                accept=".png,.jpeg,.jpg"
                onChange={handleProfilePictureUpload}
              />
            </label>

            <button className="px-4 py-1 hover:bg-slate-500">
              Admin login
            </button>
            <Link
              className="px-4 py-1 hover:bg-slate-500"
              onClick={handleLogout}
              to="/"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
