import React, { useState } from 'react';
import axios from "axios";

const { group_guidNum, POST_URL, KEY } = require("./config");

const Main = () => {
    const headers = { 
        'Content-Type':'application/json',
        'Authorization': `Bearer ${KEY}`
    }

    const [ isShortened, setIsShortened ] = useState(false);
    const [ longURL, setLongURL ] = useState('')
    const [ payload, setPayload ] = useState(null);
    const [ result, setResult ] = useState('');
  
    const generateFormData = () => {
        const formObj = {
            "group_guid":group_guidNum,
            "long_url": longURL,
        };
        console.log(JSON.stringify(formObj));
        setPayload(JSON.stringify(formObj));
        fetch(payload);
    };

    const fetch = (data) => {
        axios.post(POST_URL, data, {headers})
            .then(resp => {
                setResult(resp.data.link)
                setIsShortened(true);
            })
            .catch(err => console.log(err))
    };


    const handleClick = (e) => {
        e.preventDefault();
        generateFormData();
    };

    return (
        <div>
            <form onSubmit={ handleClick }>
                <label htmlFor="url">Paste Long URL here:</label>
                <input 
                    value={longURL}
                    name="url" 
                    type="text" 
                    placeholder="Enter url..."
                    onChange={e => setLongURL(e.target.value)} >
                </input>
                <button>Shorten!</button>
            </form>

            { isShortened ? 
                <div>
                <h2>Here's your Shortened URL</h2>
                <p>{ result }</p>
                </div> : <p>You haven't shortened anything yet.</p> }
        </div>
    )
}


export default Main;
