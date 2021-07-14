import React, { useState } from 'react';
import axios from "axios";


const { group_guid, POST_URL, KEY } = require("./config");

function Main() {

    const headers = { 
        'Content-type':'application/json',
        'Authorization': `Bearer ${KEY}`
    }

    const [ inputURL, setInputURL ] = useState('');
    const [ urlData, setUrlData ] = useState({});

    const useEffect =(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        const response = await axios.post(POST_URL, headers)
        console.log(response)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(inputURL);
    }


    return (
        <div>
            <form>
                <label htmlFor="url">Paste URL HERE:</label>
                <input 
                    value={inputURL}
                    name="url" 
                    type="text" 
                    placeholder="enter url..."
                    onChange={e => setInputURL(e.target.value)} >
                </input>
                <button onClick={ handleClick }>Shorten!</button>
            </form>

            <div>{ inputURL }</div>
            
        </div>
    )
}

export default Main;
