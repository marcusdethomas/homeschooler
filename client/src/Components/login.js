import React, {useState} from 'react'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Login = (props) => {
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errors, setErrors] = useState("");

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/login",{
            password,
            email
        },
        )
        .then((res)=>{
            //console.log("User logged in: ", res);
            console.log(res);
            navigate("/events");
        })
        .catch(err=>{
            //console.log("Login error component.", err.response.data.error);
            console.log(err.response.data.error);
            setErrors(err.response.data.error);
        })
    }
    
    return(
    <Container maxWidth="lg">
        <div className='justify-content-center'>
            <form onSubmit={onSubmitHandler}>
                <h1>Log In</h1>
                <Card sx={{ minWidth: 275 }} variant="outlined">
                    <CardContent>
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField sx={{ minWidth: 300 }} id="outlined-basic" label="Email"variant="outlined" 
                            onChange={(e)=>setEmail(e.target.value)} value={email}/>
                            {errors.email ? <Alert severity="error"><p>{errors.email.message}</p></Alert> : null}
                            </span>
                            </div>
                    </CardContent>
                    <CardContent>
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField  type= "password" sx={{ minWidth: 300 }} id="outlined-basic" label="Password"variant="outlined" 
                            onChange={(e)=>setPassword(e.target.value)} value={password}/>
                            {errors ? <Alert severity="error"><p>{errors}</p></Alert> : null}
                            </span>
                            </div>
                    </CardContent>
                        <Button  variant="contained" sx={{m:2}} type='submit-input'>Log In</Button>
                </Card>
                </form>
        </div>
    </Container>
    )
}
export default Login;