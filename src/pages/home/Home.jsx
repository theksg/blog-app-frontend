import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import SearchBar from "../../components/searchBar/SearchBar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Home = () =>{
    const [posts,setPosts]=useState([])

    const {search} = useLocation()
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res =  await axios.get(window.env.BE_URL + "/posts"+search)
            setPosts(res.data)
        }

        fetchPosts();
    },[search])

    return (
        <>
        {(search ==="") &&(<Header/>)}
        <a id="posts"></a>
        <div className="searchBar">
            <SearchBar/>
        </div>
        <div className="home">
            <Posts posts={posts}/>
        </div>
        </>
    )
}

export default Home;