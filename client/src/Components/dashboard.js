import React, {useState } from 'react'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Alert from '@mui/material/Alert';
import { setDriver } from 'mongoose';

const Dashboard = (props) => {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errors, setErrors] = useState("");
    const[successMsg, setSuccessMsg] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    setSuccessMsg("");
    const postData = {email, password};
    axios.post("http://localhost:8000/api/login", postData, {
        withCredentials:true,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
};

const handleLogout = () =>{
    axios.post("http://localhost:8000/api/logout")
    .then((response) =>{ 
        console.log(response);
        navigate("/");
    })
    .catch((err) => console.log(err))
    }


    return(
    <Container maxWidth="lg">
        <div className='justify-content-center'>
        <Link to={`/`}>Home</Link>
        <Link to={`/events`}>Events</Link>
        <p>{email}</p>
            <h1>This will be the dashboard</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <button onClick={() => handleLogout()}>Logout</button>
        </form>
    </Container>
    )
}
export default Dashboard;