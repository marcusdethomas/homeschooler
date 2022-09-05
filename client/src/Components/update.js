import React, {useEffect, useState } from 'react';
import {useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const UpdateAuthor = (props) =>{  
    const[title, setTitle] = useState("");
    const[details, setDetails] = useState("");
    const[image, setImage] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/events/${id}`,
        {withCredentials:true})
        .then((res)=>{
            setTitle(res.data.title);
            setDetails(res.data.details);
        },[])
        .catch((err)=>{
            console.log(err);
        })
    }, []);
    
    const updateEvent = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/events/${id}`,{
            title, 
            details,
        })
        .then((res)=>{
            console.log(res.data);
            navigate("/events");
        })
        .catch(err=>{
            console.log(err.response.data.errors)
            setErrors(err.response.data.errors);
        })
    }
    

    return(
<Container maxWidth="lg">
    <div className='container col-5'>
        <div className='justify-content-center'>
        <Link href="/events" underline="none">
        {'Return to Homepage'}
        </Link>
            <form onSubmit={updateEvent}>
                <h1>Edit Entry</h1>
                <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardContent>
                <div className="input-group mb-4">
                        <span className="input-group-text">
                        <TextField id="outlined-basic" label="Title"variant="outlined"
                            onChange={(e)=>setTitle(e.target.value)} value={title} />
                        {errors.title ? <Alert severity="error"><p>{errors.title.message}</p></Alert> : null}
                        </span>
                        </div>
                </CardContent>
                <CardContent>
                        <div className="input-group mb-4">
                        <span className="input-group-text">
                        <TextareaAutosize
                        aria-label="maximum height"
                        placeholder="Add details of the day's activities here. "
                        minRows={15}
                        style={{ width: 800 }}
                        onChange={(e)=>setDetails(e.target.value)} value={details}
                        />
                        {errors.details ? <Alert severity="error"><p>{errors.details.message}</p></Alert> : null}
                        </span>
                        </div>
                </CardContent>

                <label>Upload Images</label>
                <CardContent>
                <Button variant="contained" 
                        component="label"  
                        size="large" disabled>
                <input id='image' 
                accept="image/*" 
                name="image"
                type="file"
                value={image} 
                onChange={(e)=>setImage(e.target.value)}/>
                </Button>
                </CardContent>
                <Button type='submit-input'>Edit Entry</Button>
                <div>
                <Link href="/events" underline="none">
                {'Cancel'}
                </Link>
                </div>
                </Card>
                </form>
        </div>
    </div>
</Container>
    );
}
export default UpdateAuthor;