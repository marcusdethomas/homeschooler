import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import image from '../Backgrounds/beautiful-snowflakes-wallpapers.jpg'

//import UploadIcon from '@mui/icons-material/Upload';
import Alert from '@mui/material/Alert';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

const NewEvent = (props) => {
    const navigate = useNavigate();
    const[title, setTitle] = useState("Testing Images");
    const[details, setDetails] = useState("This will eventually work.");
    const[tag, setTag] = useState("");
    const[image, setImage] = useState([]);
    const[imageLocation, setImageLocation] = useState("");
    const[errors, setErrors] = useState("");
    
    
const handleChange = (e) => {
setTag(e.target.value);
};
const imageHandler = (e) => {
    setImage(e.target.files);
    //setImageLocation(e.target.value);
}

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title);
        formData.append("details", details);
        formData.append("tag", tag);
        formData.append("image", image);
        formData.append("imageLocation", imageLocation);
        console.log(image);
        axios.post("http://localhost:8000/api/events",formData,
        {withCredentials:true},
        {
            headers: {
            "Content-Type": "multipart/form-data",
            }})
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
                <CardContent>
                <div className="input-group mb-4">
                        <span className="input-group-text">
        
            <Select
                style={{minWidth:200}}
                labelId="demo-simple-select-helper-label"
                id="tag"
                value={tag}
                label="Tag"
                variant='outlined'
                onChange={handleChange}
                >
                <MenuItem value="">------------</MenuItem>
                <MenuItem value={'Art'}>Art</MenuItem>
                <MenuItem value={'Astrology'}>Astrology</MenuItem>
                <MenuItem value={'Home Economics'}>Home Economics</MenuItem>
                <MenuItem value={'Geography'}>Geography</MenuItem>
                <MenuItem value={'Math'}>Math</MenuItem>
                <MenuItem value={'Physical Education'}>Physical Education</MenuItem>
                <MenuItem value={'Science'}>Science</MenuItem>
            </Select>

                        {errors.tag ? <Alert severity="error"><p>{errors.tag.message}</p></Alert> : null}
                        </span>
                        </div>
                </CardContent>
                <label>Upload Images</label>
                <CardContent>
                <Button variant="contained" 
                        component="label"  
                        size="large">
                <input 
                id='image' 
                accept="image/*" 
                name="image"
                type="file"
                onChange={imageHandler}
                multiple
                />
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