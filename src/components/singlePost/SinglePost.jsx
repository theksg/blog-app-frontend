import axios from "axios";
import { useEffect} from "react";
import { useState ,useContext} from "react";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import {Link} from "react-router-dom";
import { Context } from "../../context/Context";
import Write from "../../pages/write/Write";
import CategoryItem from "../categoryItem/CategoryItem";


export default function SinglePost() {
    const location =useLocation()
    const postID=location.pathname.split('/')[2]
    const [post, setPost] = useState({})
    const {user} =useContext(Context);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost= async()=>{
            const res= await axios.get(window.env.BE_URL +'/posts/'+postID);
            setPost(res.data)
        }
        getPost();
    },[postID])


    const handleDelete = async () => {
        try {
          await axios.delete(window.env.BE_URL +`/posts/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };
      if(updateMode){
        post.update=true;
        return <Write post={post}/>
      }
      else
        return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <div className="singlePostImgDiv">
                    <img src={post.photo || window.env.DEFAULT_POST_IMG} 
                    alt="" className="singlePostImg" />
                </div>
                <h1 className="singlePostTitle">
                    {post.title}
                </h1>
                {
                        post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={()=> setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        )
                }

                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                    <Link to={`/profile/?username=${post.username}`} className='link'>
                        <b> {post.username}</b>
                    </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <div className="CategoryItems">
                   {
                     post.categories?.map((category,i)=><CategoryItem category={category} key={i} singlePost={true}/>)
                   }
                </div>
                <p className="singlePostDesc">
                    {post.desc}
                </p>
            </div>
        </div>
        );
}
