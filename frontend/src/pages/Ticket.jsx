
import React from 'react';
import { Link } from 'react-router-dom';
import {AiFillBackward} from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { displaySingleTicket } from '../features/ticket/TicketSlice';
import {toast} from "react-toastify";
import Spinner from '../components/Spinner';
import { resetFunctionForTicket } from '../features/ticket/TicketSlice';
import { updateSingleTicket } from '../features/ticket/TicketSlice';
import { useNavigate } from 'react-router-dom';
import { displayNotes } from '../features/note/NoteSlice';
import SingleNote from '../components/SingleNote';
import {FaPlus} from "react-icons/fa";
import Modal from "react-modal";
import { useState } from 'react';
import {FaTimes} from "react-icons/fa";
import { createMoreNote } from '../features/note/NoteSlice';

const customStyles = {
    content: {
        width: "600px",
        position: "relative",
        top: "50%",
        left: "50%",
        bottom: "auto",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)"
    }
};

Modal.setAppElement("#root");

function Ticket() {

    let params = useParams();
    let dispatch = useDispatch();
    let {ticket, isError, isSuccess, isLoading, message} = useSelector(state => state.ticket);
    let {notes, isNoteLoading} = useSelector(state => state.note);
    let [modalOpen, setModalOpen] = useState(false);
    let [noteText, setNoteText] = useState("");
    let openModal = () => setModalOpen(true);
    let closeModal = () => setModalOpen(false);
    let navigate = useNavigate();   

    useEffect(() => {

        if (ticket.message) {
            toast.error(ticket.message);
        }

        dispatch(displaySingleTicket(params.id));
        dispatch(displayNotes(params.id));
    },[params.id, ticket.message]);

   const handleClose = (id) => {
       dispatch(updateSingleTicket(id));
       toast.success("Closed successfully!");
       navigate("/tickets");
   }

   const handleChange = (e) => {
       setNoteText(e.target.value);
   }

   const handleSubmit = (et) => {
       et.preventDefault();

        let newNote = {
            text: noteText,
            ticketId: params.id
        };

        dispatch(createMoreNote(newNote));
       
       closeModal();
       setNoteText("");
   }
   
    if (isLoading || isNoteLoading) {
        return <Spinner />
    }

    if (ticket.message) {
        return (
            <div>
            <div className="w-11/12 mx-auto mb-5 xl:w-8/12 lg:w-9/12 md:w-10/12">
            <Link to="/tickets">
            <div className="text-left btn btn-lg bg-block focus:outline-0 hover:bg-sky-500"> <AiFillBackward /> Back </div>
            </Link>
            </div>
            <h1 className="text-center font-bold text-pink-500 my-10"> Something went wrong! </h1>
            </div>
        )
    };

  return (
    <div className="h-screen">
         <div className="w-10/12 mx-auto mb-5 xl:w-10/12 lg:w-10/12 md:w-10/12">
        <Link to="/tickets">
        <div className="text-left btn btn-lg bg-block focus:outline-0 hover:bg-sky-500"> <AiFillBackward /> Back </div>
        </Link>
        </div>

        <div className="mt-5 mb-3 flex flex-row items-center justify-between w-10/12 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12">
            <h1 className="text-black font-bold text-xl"> Ticket ID: {ticket._id} </h1>
            <div className={`status-${ticket.status}`}>
                {ticket.status}
            </div>
        </div>
        
        <div className="mt-5 mb-3 flex flex-row items-center justify-between w-10/12 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12">
        <h3 className="text-black font-bold text-xl"> Product: {ticket.product}</h3>
        </div>

        <div className="mt-5 mb-3 flex flex-row items-center justify-between w-10/12 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12">
            
            <h3 className='text-black font-bold text-xl pb-5 border-b-2 border-gray-400 w-full'> Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}</h3>
        </div>
        
        <div className="mt-5 mb-3 flex flex-row items-center justify-between w-10/12 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12">
            <div className="bg-slate-50 w-full p-5 rounded-lg shadow-lg">
                <h4 className="text-black font-bold text-lg mb-5"> Description of issue </h4>
                <p> {ticket.description} </p>

            </div>
        </div>

        {notes.map((note) => (
            <SingleNote key={note._id} note={note} ticketId={params.id}/>
        ))}

        <Modal isOpen={modalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Add Note">
            <div className='flex items-center justify-between mb-5'>
            <h3 className="text-xl text-bold text-black"> Add Note </h3>
            <div className='btn btn-sm bg-pink-500' onClick={closeModal}> <FaTimes /> </div>
            </div>

            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea name="notedescription" id="notedescription" cols="30" rows="10" placeholder='Enter your note...' className='w-full bg-gray-500 p-5 focus:outline-0 text-white' value={noteText} onChange={handleChange}></textarea>
                        <button type="submit" className="btn btn-lg bg-pink-500 focus:outline-0 hover:bg-sky-500 w-full"> Submit Note </button>
                    </div>
                </form>
            </div>
        </Modal>
        
        {ticket.status !== "closed" && (
               <div className="w-10/12 mx-auto mb-5 xl:w-10/12 lg:w-10/12 md:w-10/12">
               <div className="text-left btn btn-lg bg-block focus:outline-0 hover:bg-sky-500" onClick={openModal}> <FaPlus /> Add Note </div>
               </div>
        )}

        {ticket.status !== "closed" && (
            <div className="mt-5 mb-3 flex flex-row items-center justify-between w-10/12 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12">
            <div className='btn btn-lg btn-warning w-full hover:bg-sky-500 mb-10' onClick={() => handleClose(ticket._id)}> Close ticket! </div>
            </div>
        )}
        

    </div>
  )
}

export default Ticket