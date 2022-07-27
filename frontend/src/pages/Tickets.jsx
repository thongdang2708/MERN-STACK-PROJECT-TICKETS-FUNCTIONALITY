
import React from 'react';
import { Link } from 'react-router-dom';
import {AiFillBackward} from "react-icons/ai";
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { displayTickets } from '../features/ticket/TicketSlice';
import { resetFunctionForTicket } from '../features/ticket/TicketSlice';
import Spinner from '../components/Spinner';

function Tickets() {

    //Global state for ticket
    let {tickets, isSuccess, isLoading} = useSelector(state => state.ticket);

    let dispatch = useDispatch();

    
    //Reset function when there is success


    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(resetFunctionForTicket());
            }
        }
    },[isSuccess]);

    //Fetch tickets to DOM
    useEffect(() => {
        dispatch(displayTickets());

        //eslint-disable-next-line
    },[]);

    console.log(tickets);
    if (isLoading) {
        return <Spinner />
    }

  return (
    <div className="h-screen">

        <div className="w-10/12 mx-auto mb-5 xl:w-7/12 lg:w-8/12 md:w-8/12">
        <Link to="/">
        <div className="text-left btn btn-lg bg-block focus:outline-0 hover:bg-sky-500"> <AiFillBackward /> Back </div>
        </Link>
        </div>

        <h1 className="text-center text-black font-bold text-3xl mb-5"> Tickets </h1>

        <div className="w-10/12 xl:w-7/12 lg:w-8/12 md:w-8/12 mx-auto">
            <table className="table-auto text-left w-full rounded-lg border-2 border-black">
                <thead>
                    <tr>
                    <th className="py-3 px-6 text-xl text-pink-500"> Date </th>
                    <th className='py-3 px-6 text-xl text-pink-500'> Product </th>
                    <th className='py-3 px-6 text-xl text-pink-500'> Status </th>
                    <th className="py-3 px-6 text-xl text-pink-500"></th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket) => (
                        <tr>
                            <td className="py-3 px-6 font-bold text-black"> {new Date(ticket.createdAt).toLocaleString("en-US")}</td>
                            <td className="py-3 px-6 font-bold text-black"> {ticket.product}</td>
                            <td className="py-3 px-6 font-bold">
                                <div className={`status-${ticket.status}`}>
                                 {ticket.status} 
                                 </div>
                            </td>
                            <td className="py-3 px-6"> 
                                <Link to={`/ticket/${ticket._id}`}>
                                <div className="btn btn-sm bg-pink-500"> View </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
};




export default Tickets






