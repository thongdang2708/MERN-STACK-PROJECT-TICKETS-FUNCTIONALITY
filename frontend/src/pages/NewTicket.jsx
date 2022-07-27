
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createTicketFunction } from '../features/ticket/TicketSlice';
import { resetFunctionForTicket } from '../features/ticket/TicketSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from "react-toastify";
import Spinner from '../components/Spinner';
import {AiFillBackward} from "react-icons/ai";
import { Link } from 'react-router-dom';

function NewTicket() {

    //Global state of user

    let {user} = useSelector(state => state.auth);

    //Global state of ticket
    let {isError, isLoading, isSuccess, message} = useSelector(state => state.ticket);

    //Set state when there is an error
    let [sign, setSign]= useState(false);

    //Set dispatch and navigate
    let dispatch = useDispatch();
    let navigate = useNavigate(); 

    //Set state to add new ticket

    let [name, setName] = useState(user.name);
    let [email, setEmail] = useState(user.email);
    let [formData, setFormData] = useState({
        product: "Iphone",
        description: ""
    });

    //Set effect when there is wrong or success
    
    useEffect(() => {
        if (isError) {
           toast.error(message);
            
        }

        if (isSuccess) {
            navigate("/tickets");
        }

        dispatch(resetFunctionForTicket());
    }, [isError, isSuccess, dispatch, navigate, message]);

    //Set changes for data of new ticket

    const handleChange = (e) => {
        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    //Submit to add new ticket

    const handleSubmit = (et) => {

        et.preventDefault();

        let newTicket = {
            product: formData.product,
            description: formData.description
        }

        dispatch(createTicketFunction(newTicket));

    };


    if (isLoading) {
        return <Spinner />
    }

  return (
    
    <div>  

        <div className="w-10/12 mx-auto mb-5 xl:w-6/12 lg:w-8/12 md:w-8/12">
        <Link to="/">
        <div className="text-left btn btn-lg bg-block focus:outline-0 hover:bg-sky-500"> <AiFillBackward /> Back </div>
        </Link>
        </div>

        <div className="heading">
            <h1 className="text-3xl text-center font-bold text-black mb-5"> Create New Ticket </h1>
            <h3 className="text-lg text-center font-bold text-gray-500"> Please fill out the form below!</h3>
            {sign && <h1 className="text-center text-pink-500 font-bold text-2xl"> Something went wrong! </h1>}
        </div>

       

        <div className="form w-10/12 mx-auto my-5 xl:w-6/12 lg:w-7/12 md:w-8/12 p-3">
            <div className="form-group flex flex-col mb-10">
                <label htmlFor="name" className="my-2 text-lg text-black font-bold"> Customer Name: </label>
                <input type="text" name="name" id="name" className="input input-lg bg-gray-500 text-white focus:outline-0" value={name}/>
            </div>

            <div className="form-group flex flex-col mb-10">
                <label htmlFor="email" className="my-2 text-lg text-black font-bold"> Customer Email: </label>
                <input type="text" name="email" id="email" className="input input-lg bg-gray-500 text-white focus:outline-0" value={email}/>
            </div>  

            <form onSubmit={handleSubmit}>

            <div className="form-group flex flex-col mb-10">
                <label htmlFor="product" className="my-2 text-lg text-black font-bold"> Product: </label>
                <select name="product" id="product" className="input input-lg bg-gray-500 text-white focus:outline-0" onChange={handleChange} value={formData.product}>
                    <option value="Iphone"> Iphone </option>
                    <option value="Macbook Pro"> Macbook Pro </option>
                    <option value="Ipad"> Ipad </option>
                    <option value="Ipad Mini"> Ipad Mini </option>
                </select>
            </div>

            <div className="form-group flex flex-col mb-10">
                <label htmlFor="description" className="my-2 text-lg text-black font-bold"> Description: </label>
                <textarea name="description" id="description" cols="40" rows="5" placeholder='Enter Description' className="bg-gray-500 text-white focus:outline-0 rounded-lg shadow-lg p-4" onChange={handleChange} value={formData.description}> </textarea>
            </div>

            <div className="form-group">
               <button type="submit" className="btn btn-lg bg-sky-500 w-full focus:outline-0"> Submit </button>
            </div>

            </form>


        </div>


    </div>

   
  )
}

export default NewTicket