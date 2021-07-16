import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Main.css';
import { withStyles } from '@material-ui/styles';

const { group_guidNum, POST_URL, KEY } = require("./config");

const styles = {
    root: {
        padding: "35px",
    }
}

const Main = (props) => {
    const headers = { 
        'Content-Type':'application/json',
        'Authorization': `Bearer ${KEY}`
    }

    const [ isShortened, setIsShortened ] = useState(false);
    const [ longURL, setLongURL ] = useState('')
    const [ payload, setPayload ] = useState({});
    const [ result, setResult ] = useState('');
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        fetch(payload)
        setIsError(false);
    },[payload]);
  
    const generateFormData = () => {
        const formObj = {
            "group_guid":group_guidNum,
            "long_url": longURL,
        };
        console.log(JSON.stringify(formObj));
        setPayload(JSON.stringify(formObj));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsShortened(false);
        generateFormData();
    };

    const handleReset = (e) => {
        setLongURL('');
        setIsShortened(false);
        setResult('')
        setPayload({});
    }

    const fetch = (data) => {
        axios.post(POST_URL, data, {headers})
            .then(resp => {
                setResult(resp.data.link)
                setIsShortened(true);
            })
            .catch(err => {
                console.log(err);
                setIsError(true);
            })
    };

    return (
        <div className="Main-app">
            <h2>Paste URL Below</h2>
            <form className="Main-app-form" onSubmit={ handleSubmit} >
                <div className="textfield">
                    <TextField
                        label="https://www.example-url.com" 
                        id="outlined-full-width"
                        fullWidth
                        value={longURL}
                        name="url" 
                        type="text" 
                        onChange={e => setLongURL(e.target.value)} >
                    </TextField>
                </div>
                <div className={props.classes.root}>
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary"> Shorten!
                </Button>
                <Button
                    onClick={ handleReset }
                    variant="contained"
                    color="secondary">
                        Reset
                </Button>
                </div>
            </form>
            { isError && <div><h4>Please enter the long URL in the format required</h4></div> }
            { isShortened &&
                <div>
                <h2>Here's your Shortened URL</h2>
                <p>{ result }</p>
                <Button
                    variant="contained"
                    onClick={() => navigator.clipboard.writeText(result)}>
                        Copy to Clipboard
                </Button>
                </div> }
        </div>
    )
}


export default withStyles(styles)(Main);
