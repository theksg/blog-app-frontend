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
            const res= await axios.get('/posts/'+postID);
            setPost(res.data)
            console.log(post)
        }
        getPost();
    },[postID])


    const handleDelete = async () => {
        try {
          await axios.delete(`/posts/${post._id}`, {
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
                    <img src={post.photo || "https://i.pinimg.com/736x/29/46/4a/29464aa3c5800484f4577ca0c53f8953--reading-quotes-reading-books.jpg"} 
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
                     post.categories?.map(category=><CategoryItem category={category}/>)
                   }
                </div>
                <p className="singlePostDesc">
                    {post.desc}
                </p>
            </div>
        </div>
        );
}
