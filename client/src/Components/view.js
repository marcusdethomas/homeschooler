import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useParams, useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Card, ListItemText } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
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
            //console.log("Response from server: ", res.data);
            //console.log("Item id: ", id);
	})
        .catch((err)=>{
            console.log(err);
        })
    }, []);

    const deleteEvent = (eventId) => {
        axios.delete(`http://localhost:8000/api/events/${eventId}`)
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
            <CardContent>
                {event.details}
            </CardContent>
            <CardContent>Created At: {createdAt }</CardContent>
            <CardContent>Updated At: {updatedAt }</CardContent>
            </Card>
            <Button size="large" variant="contained" sx={{m:2}}  
            onClick={(e)=>{deleteEvent(event._id)}}>Delete Entry</Button>
            </Container>
        </div>
        
    )
}
export default SingleEntry;