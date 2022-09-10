import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useParams, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Card} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import moment from 'moment';


const SingleEntry = (props) => {
    const [event, setEvent] = useState({});
    const {id} = useParams(); 
    const navigate = useNavigate();
    const createdAt = moment(event.createdAt).format('MMMM Do YYYY, h:mm:ss a'); 
    const updatedAt = moment(event.updatedAt).format('MMMM Do YYYY, h:mm:ss a'); 
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/events/${id}`)
        .then((res)=>{
            setEvent(res.data);
	})
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    const deleteEvent = (eventId) => {
        axios.delete(`http://localhost:8000/api/events/${eventId}`,
        {withCredentials:true})
            .then(res => {
                navigate("/events");
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Container maxWidth="lg">
            <h1>Home Schooler</h1>
            <Link to={`/events`}>Return to Homepage</Link>
            <h2>{event.title}</h2>
            <Card sx={{ minWidth: 275, minHeight:400}} variant="outlined">
                <Card sx={{ minWidth: 275, minHeight:400}} variant="outlined">
                <CardContent>{event.details}</CardContent>
            </Card>
            <Card sx={{ minWidth: 275, minHeight:25}} variant="outlined">
                <CardContent>Subject: {event.tag}</CardContent>
            </Card>    
            <CardContent>Created At: {createdAt }</CardContent>
            <CardContent>Updated At: {updatedAt }</CardContent>
            <CardContent>{event.imageLocation}</CardContent>
            </Card>
            <Button size="large" variant="contained" sx={{m:2}}  
            onClick={(e)=>{deleteEvent(event._id)}}>Delete Entry</Button>
            </Container>
        </div>
        
    )
}
export default SingleEntry;