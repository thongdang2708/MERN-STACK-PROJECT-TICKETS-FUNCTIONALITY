import React from 'react'
import {FaSignInAlt, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { resetFunction } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { logoutFunction } from '../features/auth/AuthSlice';

function Header({changeMode}) {

    let [modeHeader, setModeHeader] = useState(false);

    let {user} = useSelector(state => state.auth);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const changeModeHeader = () => {
        setModeHeader(!modeHeader);
        changeMode();
    };

    const LogOut = () => {

        dispatch(resetFunction());
        dispatch(logoutFunction());
        navigate("/");
    }
  return (
    <header className="bg-white mb-5 xl:mb-10 lg:mb-8 md:mb-6 border-b-2 border-b-gray-500" style={!modeHeader ? {backgroundColor: "lightblue"} : {background: "gray"}}> 
        <div className="w-11/12 flex items-center justify-between mx-auto xl:w-7/12 lg:w-8/12 md:w-9/12">
            <div>
                <Link to="/">
                <h1 className="text-black font-bold text-2xl cursor-pointer"> Support Desk </h1>
                </Link>
            </div>


            {user ? <div className="flex p-5 items-center justify-between"> 
                <div className="p-2 bg-emerald-500 rounded-lg shadow-lg mr-5 text-black"> Hello <span className="font-bold">  {user.name} </span> </div>

                <div className="btn btn-sm bg-sky-500 text-black font-bold mr-5" onClick={LogOut}> Log Out </div>


                <div>
                       {!modeHeader ? <div className="btn btn-sm bg-black focus:outline-0" onClick={changeModeHeader}> To Night </div> : <div className="btn btn-sm bg-white focus:outline-0" onClick={changeModeHeader}> To Light </div>}  
                </div>
            </div> : 

            <div className="flex p-5 items-center justify-between">



                    <Link to="/login">
                         <div className="flex items-center mx-5">
                             <FaSignInAlt /> Log In
                         </div>
                     </Link>
                    
    
                    
                     <Link to="/register">
                         <div className="flex items-center mx-5">
                             <FaUser /> Register
                         </div>
                     </Link>
                    
                   
    
                    <div>
                        {!modeHeader ? <div className="btn btn-sm bg-block" onClick={changeModeHeader}> To Night </div> : <div className="btn btn-sm bg-white" onClick={changeModeHeader}> To Light </div>}
                    </div>
                    
            </div>
            }
        
        </div>
    </header>
  )
}

export default Header

