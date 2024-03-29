import React, {useEffect, useParams} from 'react'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import image from '../Backgrounds/beautiful-snowflakes-wallpapers.jpg'
const EventList = (props) => {
    const {eventList, setEventList} = (props);
    const {userName, setUserName} = (props);
    const createdAt = moment(eventList.createdAt).format('MMMM Do, YYYY'); 
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/events",{withCredentials:true})
        .then((res)=>{
            console.log("Response: ",res);
            setEventList(res.data);
	})
        .catch((err)=>{
            console.log("Error retrieving events.Nooooo!", err);
        })
    }, []);

    const logoutEvent = (eventId) => {
        axios.post("http://localhost:8000/api/logout")
            .then(res => {
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    const deleteEvent = (eventId) => {
        axios.delete(`http://localhost:8000/api/events/${eventId}`,{withCredentials:true})
            .then(res => {
                navigate("/events");
            })
            .catch(err => console.log(err))
    }
    return (
        <div style={{ backgroundImage:`url(${image})`,backgroundRepeat:"repeat", backgroundSize:"cover", minHeight:700}}>
            <Container maxWidth="lg" style={{
            
            paddingTop: "22px"
            }}>
            <h2>{userName}</h2>
            <Button href='/new'  size="large" variant="contained" sx={{m:2}}>Add Entry
            </Button>
            
            <Button size="large" variant="contained" sx={{m:2}}  
            onClick={(e)=>{logoutEvent()}}>Log Out</Button>
            <header>
                <p></p>
            </header>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table>
                                <TableHead>
                                    <TableRow sx={{padding: "0px 0px",
                                        backgroundColor: "lightblue"}} >
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Tag</TableCell>
                                        <TableCell align="right" colSpan={2}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                            
                            {   
                                eventList.map((eventList, index)=>{
                                return <TableBody key={index}>
                            <TableRow>
                                <TableCell style={{width:'25%'}}> {eventList.title}</TableCell>
                                <TableCell style={{width:'25%'}}> {createdAt} </TableCell>
                                <TableCell style={{width:'25%'}}> {eventList.tag} </TableCell>
                                <TableCell style={{minWidth:500}} align="right" >
                                    <Link to={`/events/${eventList._id}`}>
                                    <Button variant="contained">Details</Button>
                                    </Link>
                                    <Link to={`/events/edit/${eventList._id}`}>
                                    <Button variant="contained" sx={{m:2}}>Edit</Button>
                                    <Button variant="contained" sx={{m:2}}  
                                    onClick={(e)=>{deleteEvent(eventList._id)}}>Delete Entry</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            </TableBody>})}
                    </Table>    
                </TableContainer>
            </Container>
        </div>
    )
};

export default EventList;
