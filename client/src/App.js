import React, { useState } from 'react';
import Main from './Views/Main'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './Components/dashboard';
import Login from './Components/login';
import EventList from './Components/events';
import NewEvent from './Components/new';
import SingleEntry from './Components/view';
import UpdateEvents from './Components/update'
function App() {
  const [eventList, setEventList] = useState([]);
  return (
    <div className="App">
      <div> 
      <BrowserRouter>
        <Routes>  
          <Route element={<Main/>} path="/" default /> 
          <Route element={<Dashboard/>} path="/dashboard" /> 
          <Route element={<Login/>} path="/login"/> 
          <Route element={<EventList eventList={eventList} setEventList={setEventList} />} path="/events" /> 
          <Route element={<NewEvent/>} path="/new" /> 
          <Route element={<SingleEntry/>} path="/events/:id" />
          <Route element={<UpdateEvents/>} path="/events/edit/:id" /> 
        </Routes>  
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
