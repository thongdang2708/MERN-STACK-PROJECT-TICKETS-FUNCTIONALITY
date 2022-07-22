
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStatus } from '../hooks/authStatus';
import Spinner from './Spinner';

const Private = () => {

    let {loggedIn, checkStatus} = authStatus();

    if (checkStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />

  
}

export default Private