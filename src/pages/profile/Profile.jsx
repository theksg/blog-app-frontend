import { useEffect } from "react";
import ProfileCard from "../../components/profileCard/ProfileCard";
import Posts from "../../components/posts/Posts";
import "./profile.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext,useState } from "react";
import { Context } from "./../../context/Context";

const Profile = () =>{
    const [posts,setPosts]=useState([])

    const {user}=useContext(Context)
    const {search} = useLocation()
    console.log(search)

    const [cur_user, setCur_user] = useState("");

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res =  await axios.get("/posts"+search)
            console.log(res.data)
            setPosts(res.data)
        }

        fetchPosts();
        setCur_user(search.substring(search.indexOf("=")+1))
    },[search])
    return (
        <>
        <ProfileCard/>
        {posts.length>0 ? (<h3>
            {
                cur_user === user.username ? (
                    <>
                        Your Precious Contributions !!!
                    </>
                ):(
                    <>
                        From the Pen of {cur_user}
                    </>
                )
            }
        </h3>):(
            <h3>Wow!!! Such Empty</h3>
        )
        }
        <div className="home">
            <Posts posts={posts}/>
        </div>
        </>
    )
}

export default Profile;