import React, {useState} from 'react'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const NewUser = (props) => {
    const navigate = useNavigate();
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirm, setConfirm] = useState("");
    const [duplicateEmail, setDuplicateEmailError] = useState("");
    const [errors, setErrors] = useState([]);
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/newuser/",{
            firstName,
            lastName,
            password,
            email, 
            confirm // even though this is virtual, needs to be here so that is sent to the server
        })
        .then((res)=>{
            console.log("User Created: ", res);
            navigate("/events");
        })
        .catch(err=>{
            console.log("Registration component error: ", err.response.data.error);
            setDuplicateEmailError(err.response.data.error);
            // loop to prevent error assigning errors
            if(duplicateEmail !== ""){
            console.log("Duplicate email loop.");
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; 
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            }
            //setErrors(err.response.data);
            
        })
    }
    
    return(
    <Container maxWidth="lg">
        <div className='justify-content-center'>
            <form onSubmit={onSubmitHandler}>
                <h1>Registration</h1>
                <Card sx={{ minWidth: 275 }} variant="outlined">
                    <CardContent>
                    <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField sx={{ minWidth: 300 }} id="outlined-basic" label="First Name"variant="outlined"  
                            onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                            
                            </span>
                            </div>
                    </CardContent>
                    <CardContent>
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField sx={{ minWidth: 300 }} id="outlined-basic" label="Last Name"variant="outlined" 
                            onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                            
                            </span>
                            </div>
                    </CardContent>
                    <CardContent>
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField sx={{ minWidth: 300 }} id="outlined-basic" label="Email"variant="outlined" 
                            onChange={(e)=>setEmail(e.target.value)} value={email}/>
                            
                            </span>
                            </div>
                    </CardContent>
                    <CardContent>
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField type= "password" sx={{ minWidth: 300 }} id="outlined-basic" label="Password" variant="outlined"
                            onChange={(e)=>setPassword(e.target.value)} value={password}/>
                            
                            </span>
                            </div>
                    </CardContent>
                    <CardContent>                
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                            <TextField type= "password" sx={{ minWidth: 300 }} id="outlined-basic" label="Confirm Password"variant="outlined" 
                            onChange={(e)=>setConfirm(e.target.value)} value={confirm}/>
                            
                            </span>
                            </div>
                    </CardContent>
                        <Button  variant="contained" sx={{m:2}} type='submit-input'>Register</Button>
                        {duplicateEmail ? <p>{duplicateEmail}</p> : null}
                        {errors.map((err, index) => <p key={index}>{err}</p>)}
                </Card>
                </form>
        </div>
    </Container>
    )
}
export default NewUser;