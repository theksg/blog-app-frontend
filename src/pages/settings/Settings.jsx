import "./settings.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useContext,useState } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
});


export default function Settings() {
    const {user}=useContext(Context)
    const {dispatch}=useContext(Context);
    const [inputs, setInputs] = useState(user);
    const handleChange = e => setInputs(prevState => 
        ({ ...prevState, [e.target.name]: e.target.value })
        );
    const [file, setFile] = useState(null)

    const [press, setPress] = useState(false);

    const handleUpdate = async (event) =>{
        setPress(true);
        const updatedUser = new FormData();

        for ( const key in inputs ) {
            updatedUser.append(key, inputs[key]);
        }
        updatedUser.append("userId", user._id);

        if(file){
            const filename=Date.now() + file.name;
            updatedUser.append("name",filename);
            updatedUser.append("file",file);
            updatedUser.append("height",130);
      
            // try{
            //   const res=await axios.post(window.env.BE_URL +"/upload",updatedUser);
            //   updatedUser.profilePic=res.data.url;
            //   imageUploaded = true;
            // }
            // catch(error){
            //   console.log(error)
            // }
          }
        try{
            const res=await axios.put(window.env.BE_URL +`/users/${user._id}`,updatedUser)
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            window.location.replace("/");
        }
        catch(err){
            if('username' in err.response?.data?.keyPattern){
                alert(`Account for username ${err.response.data.keyValue.username} already exists`)
                setInputs(prevState => 
                    ({ ...prevState, "username": user.username })
                );
            }
            else if('email' in err.response?.data?.keyPattern){
                alert(`Account for email ${err.response.data.keyValue.email} already exists`)
                setInputs(prevState => 
                    ({ ...prevState, "email": user.email })
                );
            }
            else if('emailPattern' in err.response?.data?.keyPattern){
                alert(`Invalid e-mail address added`)
                setInputs(prevState => 
                    ({ ...prevState, "email": user.email })
                );
            }
            else if('facebook' in err.response?.data?.keyPattern){
                alert(`Invalid url for facebook`)
                setInputs(prevState => 
                    ({ ...prevState, "facebook": user.facebook })
                );
            }
            else if('linkedin' in err.response?.data?.keyPattern){
                alert(`Invalid url for linkedin`)
                setInputs(prevState => 
                    ({ ...prevState, "linkedin": user.linkedin })
                );
            }
            else{
                alert(`Some Error occured, please try again later`);
                setInputs(prevState => user);
            }
            setPress(false);
        }
    }

    const handleDelete = async ()=>{
        try{
            await axios.delete(window.env.BE_URL +`/users/${user._id}`, {
                data: { userId: user._id },
              });
            dispatch({type:"LOGOUT"});
            // window.location.replace("/");
        }
        catch(error){
            alert("Failed to delete account. Please try again later")
        }
    }
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Account</span>
                    <span className="settingsTitleDelete" onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></span>
                </div>
                <form action="" className="settingsForm">
                    <div className="settingsPP">
                        
                        {
                            file?(
                                <img
                                src={URL.createObjectURL(file)}
                                />
                              ):(<img src={user.profilePic || window.env.DEFAULT_PROFILE_PIC} alt="" />)
                        }
                        <IconButton>
                            <label htmlFor="fileInput" className="settingsPPIcon">
                                <AccountCircleIcon />
                            </label>
                        </IconButton>
                        <input type="file" id="fileInput" style={{ display: "none" }}
                        onChange={event=>setFile(event.target.files[0])} />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="Firstname" variant="filled" type={"text"} fullWidth
                        value={inputs.firstname}
                        onChange={handleChange}
                        name="firstname"
                        />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="Lastname" variant="filled" type={"text"} fullWidth
                        value={inputs.lastname}
                        onChange={handleChange}
                        name="lastname"
                        />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="Bio" variant="filled" type={"text"} fullWidth
                        value={inputs.bio}
                        onChange={handleChange}
                        name="bio"
                        />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="Username" variant="filled" type={"text"} fullWidth
                        value={inputs.username}
                        onChange={handleChange}
                        name="username"
                        />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="E-Mail" variant="filled" type={"email"} fullWidth
                        value={inputs.email}
                        onChange={handleChange}
                        name="email"
                        />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="Facebook" variant="filled" type={"text"} fullWidth
                        value={inputs.facebook}
                        onChange={handleChange}
                        name="facebook"
                        />

                    </div>
                    <div className="settingsTF">
                        <TextField id="filled-basic" label="Linkedin" variant="filled" type={"text"} fullWidth
                        value={inputs.linkedin}
                        onChange={handleChange}
                        name="linkedin"
                        />

                    </div>
                    <div className="updateButton">
                        <ThemeProvider theme={buttonTheme}>
                            {!press ? (
                                <Button
                                onClick={handleUpdate}
                                variant="outlined"
                                >Update</Button>
                            ):(
                                <Loader/>
                            )}
                        </ThemeProvider>
                    </div>
                </form>
            </div>
        </div>);
}
