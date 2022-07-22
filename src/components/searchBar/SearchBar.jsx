import "./searchBar.css";
import { useState } from "react";

export default function Searchbar(){

    const [search, setSearch] = useState(null);

    const handleSearch = ()=>{
        window.location.replace(`/?category=${search}#posts`)
    }

    return (
        <div class="searchBox">
            <input class="searchInput"type="text" name="" placeholder="Search" 
            value={search}
            onChange={event=>setSearch(event.target.value)}
            />
            <button class="searchButton" onClick={handleSearch}>
                <i class="material-icons">
                    search
                </i>
            </button>
        </div>
    )
}