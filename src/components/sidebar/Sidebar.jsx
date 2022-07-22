import "./sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";


const Sidebar = () => {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        const getCategories = async ()=>{
            const res=await axios.get(window.env.BE_URL +'/categories')
            setCategories(res.data)
        }
        getCategories();
    })
    return (
        <div className="sideBar">
            <div className="sideBarItem">
                <div className="sideBarTitle">
                    ABOUT ME
                </div>
                <img
                    className="sideBarImg"
                    src="https://img.joomcdn.net/1f2187be68327142f82d31cf0e54d47e561c373c_original.jpeg"
                    alt="Profile"
                ></img>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sunt distinctio odio officia eligendi obcaecati quae molestiae maxime vero laboriosam!</p>
            </div>
            <div className="sideBarItem">
                <div className="sideBarTitle">
                    CATEGORIES
                </div>
                <ul className="sideBarList">
                {categories.map((cur_category)=>(
                            <Link to={`/?category=${cur_category.name}`} className='link'>
                                <li className="sideBarListItem">{cur_category.name}</li>
                            </Link>
                    ))}
                    
                </ul>
            </div>
            <div className="sideBarItem">
                <div className="sideBarTitle">
                    FOLLOW US
                </div>
                <div className="sideBarSocial">
                    <i className="sideBarIcon fab fa-facebook-square"></i>
                    <i class="sideBarIcon fab fa-twitter-square"></i>
                    <i class="sideBarIcon fab fa-instagram-square"></i>
                    <i class="sideBarIcon fab fa-youtube-square"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;