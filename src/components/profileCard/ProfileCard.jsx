import "./profileCard.css";
import { useContext,useEffect,useState } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProfileCard = () =>{
  const {user,dispatch}=useContext(Context);
  const {search} = useLocation();
  const [userProfile, setUserProfile] = useState(user);

  useEffect(()=>{
    const fetchUser= async ()=>{
        const res =  await axios.get(window.env.BE_URL +"/users"+search)
        setUserProfile(res.data)
    }
    
  const cur_user=search.substring(search.indexOf("=")+1)
  if(cur_user!==user.username)
    fetchUser();

},[search])
    return (
        <div className="profileCard">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="our-team">
                    <div className="picture">
                      <img 
                      className="img-fluid" 
                      src={userProfile.profilePic || window.env.DEFAULT_PROFILE_PIC}/>
                    </div>
                    <div className="team-content">
                      {
                        userProfile.firstname ? (
                          <>
                          <h3 className="name">{userProfile.firstname +` `+ userProfile.lastname}</h3>
                          <h4 className="title">{userProfile.username}</h4>
                          </>
                        ):(
                          <>
                          <h4 className="name">{userProfile.username}</h4>
                          </>
                        )
                      }
                      {
                        userProfile.bio &&(<p>{userProfile.bio}</p>)
                      }
                    </div>
                    <ul className="social">
                      {
                        userProfile.facebook && (<li><a href={userProfile.facebook} className="fa fa-facebook" aria-hidden="true" target="_blank"></a></li>)
                      }
                      {
                        userProfile.linkedin && (<li><a href={userProfile.linkedin} className="fa fa-linkedin" aria-hidden="true" target="_blank"></a></li>)
                      }
                      
                      <li><a href={`mailto:${userProfile.email}`} className="fa-solid fa-envelope" aria-hidden="true" target="_blank"></a></li>
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default ProfileCard;