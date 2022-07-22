
import React from 'react';
import {FaUser} from "react-icons/fa";
import { useState, useEffect} from 'react';
import {toast} from "react-toastify";
import { useDispatch, useSelector} from 'react-redux';
import { register } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { resetFunction } from '../features/auth/AuthSlice';
import Spinner from '../components/Spinner';
function Register() {

  let [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "password": "",
    "password2": ""
  });
  
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    };

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(resetFunction());
  }, [isError, isSuccess, user, message, navigate, dispatch]);
 
  const handleChange = (e) => {

    let {name, value} = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };


  const handleSubmit = (et) => {
      et.preventDefault();

      if (formData.password !== formData.password2) {
          toast.error("Password does not match")
      } else {

        let registerData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }

        dispatch(register(registerData));

      }

     
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="register-page h-screen">
        <div className="heading p-10">
            <h1 className="flex items-center justify-center"> <FaUser className="inline-block" size={40}/> <span className="text-black font-bold text-2xl ml-5"> Register </span> </h1>
            <p className="text-center my-10 font-bold text-xl"> Please create an account </p>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit}>
          <div className="form-group text-center mb-10">
            <input type="text" id="name" name="name" placeholder='Enter Your Name' value={formData.name} onChange={handleChange }className="input input-lg bg-gray-500 w-8/12 focus:outline-0 xl:w-6/12 lg:w-7/12 md:w-8/12 text-white" required/>
          </div>

          <div className="form-group text-center mb-10">
            <input type="email" id="email" name="email" placeholder='Enter Your Email' value={formData.email} onChange={handleChange} className="input input-lg bg-gray-500 w-8/12 focus:outline-0 xl:w-6/12 lg:w-7/12 md:w-8/12 text-white" required/>
          </div>

          <div className="form-group text-center mb-10">
            <input type="password" id="password" name="password" placeholder='Enter Your Password' value={formData.password} onChange={handleChange} className="input input-lg bg-gray-500 w-8/12 focus:outline-0 xl:w-6/12 lg:w-7/12 md:w-8/12 text-white" required/>
          </div>

          <div className="form-group text-center mb-10">
            <input type="password" id="password2" name="password2" placeholder='Confirm Your Password' value={formData.password2} onChange={handleChange} className="input input-lg bg-gray-500 w-8/12 focus:outline-0 xl:w-6/12 lg:w-7/12 md:w-8/1 text-white" required/>
          </div>
          
          <div className="text-center">
          <button type="submit" className="btn btn-lg bg-pink-500 focus:outline-0"> Register User! </button>
          </div>
          </form>
        </div>

    </div>
  )
}

export default Register