// import Post from "../post/Post"
import { useEffect, 
  // useState 
}
   from "react"
import axios from "axios"
import Share from "../share/Share"
import "./feed.css"


export default function Feed() {
  // const [posts, setPosts]  = useState([])

  useEffect(()=>{
      fetchtimelinePosts()
  },[])

  const fetchtimelinePosts = async()=>{
    try {
      axios.defaults.withCredentials = true
      const res = await axios.get(`http://localhost:4000/api/posts/timelinePosts`)
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="feed">
        <div className="feedwrapper">
            <Share/>
            {/* {Post.map((p)=>(
              <Posts key = {p.id} post={p} />
            ))} */}
        </div>
    </div>
  )
}
