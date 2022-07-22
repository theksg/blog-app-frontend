import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Post from "./components/post/Post";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";



function App() {
  const {user}=useContext(Context)
  return (
    <BrowserRouter>
    <div className="App">
      <Topbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={user?<Home/>:<Register/>} />
      <Route path="/login" element={user?<Home/>:<Login/>} />
      <Route path="/write" element={user?<Write/>:<Register/>} />
      <Route path="/settings" element={user?<Settings/>:<Register/>} />
      <Route path="/post/:postID" element={<Single />} />
      <Route path="/profile" element={user?<Profile/>:<Login />} />
      </Routes>
    </div> 
    </BrowserRouter>
  );
}

export default App;
