
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from './Spinner';


//Set private for routes with user only, else requires to log in to get priviledge
const Private = () => {

    let [loggedIn, setLoggedIn] = useState(false);
    let [checkStatus, setCheckStatus] = useState(true);
    let {user} = useSelector(state => state.auth);

    useEffect(() => {

        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        };

        setCheckStatus(false);
        
    },[user]);

    if (checkStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />

  
}

export default Private