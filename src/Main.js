import React, { useState } from 'react';
import axios from "axios";


const { group_guidNum, POST_URL, KEY } = require("./config");

function Main() {

    const headers = { 
        'Content-type':'application/json',
        'Authorization': `Bearer ${KEY}`
    }

    const [ inputURL, setInputURL ] = useState('')
    const [ formData, setFormData ] = useState(null);
    const [ result, setResult ] = useState('')

    // const fetchData = async () => {
    //     const response = await axios.post(POST_URL, formData, headers)
    //         .then(response => console.log(response.data))
        
    // }
    
    const useEffect =(() => {
        const fetchData = async () => {
            const response = await axios.post(POST_URL,formData,headers)
            console.log(response);   
        }
    },[inputURL]);

    const generateFormData = async () => {
        const formData = {
            "group_guid":group_guidNum,
            "long_url": inputURL
        }
        console.log(JSON.stringify(formData));
        setFormData(JSON.stringify(formData));
        // fetchData();
    }

    const handleClick = async (e) => {
        e.preventDefault();
        generateFormData();
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

            <h2>Shortened URL</h2>
            <p>{ result }</p>
            
        </div>
    )
}

export default Main;
