import { Link } from "react-router-dom";
import "./topbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";


const Topbar = () => {
    const {user,dispatch}=useContext(Context);

    const handleLogout=()=>{
        dispatch({type:"LOGOUT"});
    }

    function change_css_burger_icon(){
        if(window.screen.width>800)
            return;
        let LIItems=document.getElementsByClassName('topListItem')
    
        for(let i=0;i<LIItems.length;i++)
            LIItems[i].style.cssText = 'display:block;'
    
        // document.getElementById('nonIconItem').classList.add('container');
        document.getElementById('topbar').style.cssText='height: 100%;';
        
        document.getElementById('cross').style.cssText='display:block;'
        document.getElementById('ham').style.cssText='display:none;'
    }

    function change_css_cross_icon(){
        if(window.screen.width>800)
            return;
        let LIItems=document.getElementsByClassName('topListItem')
    
        for(let i=0;i<LIItems.length;i++)
            LIItems[i].style.cssText = 'display:none;'
        
        // document.getElementById('nonIconItem').classList.remove('container');
        document.getElementById('topbar').style.removeProperty('height');
        document.getElementById('cross').style.cssText='display:none;'
        document.getElementById('ham').style.cssText='display:block;'
    }
    return (
        <>
            <div className="topbar" id="topbar">
                <div className="topCenter">
                    <ul className="topList">
                        <li  id="ham">
                            <i class="fa-solid fa-bars" onClick={change_css_burger_icon}></i>
                        </li>
                        <li  id="cross">
                            <i class="fa-solid fa-xmark" onClick={change_css_cross_icon}></i>
                        </li>
                        <li className="topIconFullScreen">
                            <i class="fa-solid fa-bookmark"></i>
                        </li>
                        <li className="topListItem" onClick={change_css_cross_icon}>
                            <Link className="link" to="/">
                                HOME
                            </Link>
                        </li>
                        <li className="topListItem" onClick={change_css_cross_icon}>                        
                        <Link className="link" to="/write">
                            WRITE                        
                        </Link>
                        </li>
                        {
                            user &&
                            (<li className="topListItem" onClick={change_css_cross_icon}>                        
                            <Link className="link" to="/settings">
                                ACCOUNT                        
                            </Link>
                            </li>)
                        }
                    </ul>
                </div>
                <div className="topRight" onClick={change_css_cross_icon}>

                    {user&&(
                        <>
                            <Link className="link" to={`/profile/?username=${user.username}`}>
                            <img
                                className="topImageIcon"
                                src={user.profilePic || window.env.DEFAULT_PROFILE_PIC}
                                alt="Profile"
                            ></img></Link>
                            <i class="fa-solid fa-arrow-right-from-bracket logoutIcon topIcon" 
                            onClick={handleLogout}
                            ></i>
                        </>
                    )
                }
                    
                </div>
            </div>
        </>

    )
}

export default Topbar;