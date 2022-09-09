import "./write.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import CategoryBox from "../../components/categoryBox/CategoryBox";
import Loader from "../../components/loader/Loader";

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});


export default function Write(post) {
  let update=post.post.update || false;


  const [press, setPress] = useState(false);
  const [title,setTitle]=useState(post.post.title);
  const [desc,setDesc]=useState(post.post.desc);
  const [file,setFile]=useState(null);
  const {user} =useContext(Context);
  const [categories, setCategories] = useState(post.post.categories || [])
  const handleSubmit = async event =>{
    event.preventDefault();
    setPress(true);

    const newPost = new FormData();
    newPost.append("username",user.username);
    newPost.append("title",title);
    newPost.append("desc",desc);
    newPost.append("categories",JSON.stringify(categories));

    if(file){
      const filename=Date.now() + file.name;
      newPost.append("name",filename);
      newPost.append("file",file);
      newPost.append("height",300);
    }

    try{
      let res;
      if(update){
        res=await axios.put(window.env.BE_URL +`/posts/${post.post._id}`,newPost)
      }
      else{
        res=await axios.post(window.env.BE_URL +"/posts",newPost);
      }
      window.location.replace("/post/"+res.data._id);
    }
    catch(error){
      console.log(error)
      setPress(false);
    }
  }

  return (
    <div className='write'>
      
      <img src={file?URL.createObjectURL(file):post.post.photo || window.env.WRITE_IMG} alt="" className="writeTopImg" />
      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroupTop">
          <label htmlFor="fileInput">
            <AttachFileIcon className="writeIcon"/>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} 
          onChange={event=>setFile(event.target.files[0])}
          />
          <TextField
            id="filled-basic"
            label="Tilte"
            variant="filled"
            className="writeTitleTF"
            value={title}
            onChange={event=>setTitle(event.target.value)}
          />
        </div>
        <div className="categoryBox">
          <CategoryBox setCategories={setCategories} categories={categories}/>
        </div>
        <div className="writeFormGroupBottom">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="Share your story....."
            className="writeTA"
            value={desc}
            onChange={event=>setDesc(event.target.value)}
          />
        </div>
        <div className="writeButton">
        <ThemeProvider theme={buttonTheme}>
        {
          !press ? (
            <Button 
            variant="outlined" 
            className="writeButton"
            type="submit"
            >Publish</Button>
          ):(
            <Loader/>
          )
        }
        </ThemeProvider>
        </div>
      </form>
    </div>);
}

Write.defaultProps ={
  post:{
    post:{
      title:"",
      desc:"",
      update:false
    }
  }
}
