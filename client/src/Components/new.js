import React, {useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
//import UploadIcon from '@mui/icons-material/Upload';
import Alert from '@mui/material/Alert';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

const NewEvent = (props) => {
    const navigate = useNavigate();
    const[title, setTitle] = useState("Testing Images");
    const[details, setDetails] = useState("This will eventually work.");
    const[image, setImage] = useState("");
    const[errors, setErrors] = useState("");

    
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title);
        formData.append("details", details);
        formData.append("image", image);
        console.log(image);
        axios.post("http://localhost:8000/api/events",formData,{
        })
        .then((res)=>{
            console.log("Event added: ", res);
            navigate("/events");
        })
        .catch(err=>{
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        })
    }
    
    return(
    <Container maxWidth="lg">
        <div className='justify-content-center'>
            <Link href="/events" underline="none">Homepage</Link>
            <form onSubmit={onSubmitHandler} encType="multipart/form-data" method='post'>
                <h1>Add Event</h1>
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
                        size="large">
                <input id='image' 
                accept="image/*" 
                name="image"
                type="file"
                value={image} 
                onChange={(e)=>setImage(e.target.value)}/>
                </Button>
                </CardContent>
                <Button type='submit-input'>Add Event</Button>
                <div>
                <Link href="/events" underline="none">
                {'Cancel'}
                </Link>
                </div>
                </Card>
                </form>
        </div>
    </Container>
    )
}
export default NewEvent;