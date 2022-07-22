import "./posts.css";
import Post from "../post/Post";

export default function Posts({posts}) {
  return (
  <div className='posts'>
      {
        posts.map((cur_post)=>(
          <Post post={cur_post}/>
        ))
      }
  </div>
  );
}
