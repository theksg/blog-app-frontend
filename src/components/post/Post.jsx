import "./post.css";
import {Link} from "react-router-dom";
import CategoryItem from "../categoryItem/CategoryItem";


export default function Post({post}) {
  return (
      <>
      <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        <img 
          src={post.photo || "https://i.pinimg.com/736x/29/46/4a/29464aa3c5800484f4577ca0c53f8953--reading-quotes-reading-books.jpg"} 
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
