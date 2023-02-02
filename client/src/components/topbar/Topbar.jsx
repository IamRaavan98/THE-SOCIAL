// import { Person, Search } from "@mui/icons-material";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import Authcontext from "../../context/Authcontext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//we will use context api data of user which is stored at the time of login as we will go from here to profile page

export default function Topbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  
  //using context
  const { data } = useContext(Authcontext);
  
  const [bgColorchangeHome, setBgColorChangeHome] = useState();
  const [bgColorchangetimeline, setBgColorChangeTimeline] = useState();
   const [profilebar, setProfileBar] = useState('none')

  const handleLogout = async()=>{
    try {
      const res  = await axios.get(`/api/users/logout`);

      
    } catch (error) {
      console.log(error.message);
    }
  }

 const handleProfile  = ()=>{
  if(profilebar === 'none'){
    setProfileBar('flex')
  }
  else{
    setProfileBar('none')

  }
 }


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">THE SOCIAL</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="flex flex-row topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">
            <button>
              <Link
                className={`bg-${bgColorchangeHome}`}
                onClick={()=>setBgColorChangeHome("black")}
                to={`/profile?username=${
                  data.user.username && data.user.username
                }&_id=${data.user && data.user._id}`}
              >
                HomePage
              </Link>
            </button>
          </span>

          <span className="topbarLink">
            <Link
             className={`bg-${bgColorchangetimeline}`}
             onClick={()=>setBgColorChangeTimeline("black")}
              to="/home">Timeline</Link>
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

<div onClick={handleProfile} className="flex flex-col ">

        <img  src="https://res.cloudinary.com/dumda0jde/image/upload/v1675342630/users/vv769whayfazwztscvd9.jpg" alt="" className="topbarImg" />
       
          
       <div style={{display:`${profilebar}`}} className="fixed top-[50px] right-[20px] flex flex-col bg-[#1877F2] items-start ">
         <button className="px-4 py-1">Change Profile</button>
         <button className="px-4 py-1">Admin login</button>
         <Link  className="px-4 py-1" onClick={handleLogout} to="/">Logout</Link>
        
        </div>
</div>

        
      </div>
    </div>
  );
}
