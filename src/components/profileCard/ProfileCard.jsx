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
        const res =  await axios.get("api/users"+search)
        console.log(res.data)
        setUserProfile(res.data)
    }
    
  const cur_user=search.substring(search.indexOf("=")+1)
  if(cur_user!==user.username)
    fetchUser();

},[search])
    return (
        <div className="profileCard">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div class="our-team">
                    <div class="picture">
                      <img 
                      class="img-fluid" 
                      src={userProfile.profilePic || "https://cdn.pixabay.com/photo/2013/03/30/00/11/user-97890_960_720.png"}/>
                    </div>
                    <div class="team-content">
                      {
                        userProfile.firstname ? (
                          <>
                          <h3 class="name">{userProfile.firstname +` `+ userProfile.lastname}</h3>
                          <h4 class="title">{userProfile.username}</h4>
                          </>
                        ):(
                          <>
                          <h4 class="name">{userProfile.username}</h4>
                          </>
                        )
                      }
                      {
                        userProfile.bio &&(<p>{userProfile.bio}</p>)
                      }
                    </div>
                    <ul class="social">
                      {
                        userProfile.facebook && (<li><a href={userProfile.facebook} class="fa fa-facebook" aria-hidden="true" target="_blank"></a></li>)
                      }
                      {
                        userProfile.linkedin && (<li><a href={userProfile.linkedin} class="fa fa-linkedin" aria-hidden="true" target="_blank"></a></li>)
                      }
                      
                      <li><a href={`mailto:${userProfile.email}`} class="fa-solid fa-envelope" aria-hidden="true" target="_blank"></a></li>
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default ProfileCard;