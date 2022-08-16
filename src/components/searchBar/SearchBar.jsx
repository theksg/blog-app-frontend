import "./searchBar.css";
import { useState } from "react";

export default function Searchbar(){

    const [search, setSearch] = useState("");

    const handleSearch = ()=>{
        window.location.replace(`/?category=${search}#posts`)
    }

    return (
        <div className="searchBox">
            <input className="searchInput"type="text" name="" placeholder="Search" 
            value={search}
            onChange={event=>setSearch(event.target.value)}
            />
            <button className="searchButton" onClick={handleSearch}>
                <i className="material-icons">
                    search
                </i>
            </button>
        </div>
    )
}