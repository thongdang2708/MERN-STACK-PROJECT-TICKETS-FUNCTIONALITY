import React from 'react';
import {FaSignInAlt} from "react-icons/fa";
import { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { login } from '../features/auth/AuthSlice';
import {toast} from "react-toastify";
import { resetForLogin } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
function Login() {

  let [formData, setFormData] = useState({
      email: "",
      password: ""
  }); 

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {user, isError, isSuccess, message, isLoading} = useSelector(state => state.auth);

  useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess || user) {
        navigate("/");
      };

      dispatch(resetForLogin());

  }, [isError, isSuccess, message, user, dispatch, navigate]);

  const handleChange = (e) => {

      let {name, value} = e.target;

      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }))
  };

  const handleSubmit = (et) => {
      et.preventDefault();

      let loginData = {
        email: formData.email,
        password: formData.password
      };

      dispatch(login(loginData));

  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="h-screen">
       <div className="heading">
         <h1 className="flex items-center justify-center mb-10"> <FaSignInAlt className="inline-block" size={30}/>  <span className='text-2xl font-bold text-black ml-5'> Log In </span> </h1>
         <p className="text-center text-gray-300 font-bold text-3xl"> Please Log In To Support </p>
       </div>

       <div className="form">
        <form onSubmit={handleSubmit}>
        <div className="form-group text-center my-10">
          <input type="email" name="email" id="email" placeholder='Enter your email...' value={formData.email} onChange={handleChange} className="input input-lg bg-gray-500 focus:outline-0 w-8/12 xl:w-5/12 lg:w-6/12 md:w-7/12 text-white required"/>
        </div>

        <div className="form-group text-center my-10">
          <input type="password" name="password" id="password" placeholder='Enter your password...' value={formData.password} onChange={handleChange} className="input input-lg bg-gray-500 focus:outline-0 w-8/12 xl:w-5/12 lg:w-6/12 md:w-7/12 text-white required"/>
        </div>

        <div className='text-center'>
        <button type="submit" className="btn btn-lg bg-pink-500 focus:outline-0 text-center"> Log In </button>
        </div>
        </form>
       </div>
    </div>
  )
}

export default Login