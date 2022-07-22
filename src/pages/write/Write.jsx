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
  console.log(categories)
  const handleSubmit = async event =>{
    event.preventDefault();
    setPress(true);

    const newPost ={
      username:user.username,
      title,
      desc,
      categories
    }

    if(file){
      const data=new FormData();
      const filename=Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      data.append("height",300);
      newPost.photo=filename;

      try{
        const res=await axios.post("/upload",data);
        console.log(res);
        newPost.photo=res.data.url;
      }
      catch(error){
        console.log(error)
      }
    }

    try{
      let res;
      if(update){
        res=await axios.put(`/posts/${post.post._id}`,newPost)
      }
      else{
      res=await axios.post("/posts",newPost);
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
      
      <img src={file?URL.createObjectURL(file):post.post.photo || ("https://www.hopkinsmedicine.org/sebin/x/e/syt-teaser-2.jpg")} alt="" className="writeTopImg" />
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
