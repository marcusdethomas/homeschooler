import React, { useState } from 'react';
import Login from '../Components/login';
import Register from '../Components/register'
import Dashboard from '../Components/dashboard';
import EventList from '../Components/events';

const Main = (props) => {

    return (
        <div>
            <Login/>
            <Register/>
        </div>
    )
}
export default Main;
