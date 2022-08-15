import "./post.css";
import {Link} from "react-router-dom";
import CategoryItem from "../categoryItem/CategoryItem";


export default function Post({post}) {
  return (
      <>
      <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        <img 
          src={post.photo || window.env.DEFAULT_POST_IMG} 
          alt="" 
          className="postImg" />
        <div className="postInfo">
            <div className="postCategories">
              {
                post.categories?.map(category=><CategoryItem category={category}/>)
              }
            </div>
            
            <span className="postTitle">{post.title}</span>           
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            <p className="postDesc">
              {post.desc}
            </p>
        </div>
      </div>
      </Link>
      </>
  );
}
