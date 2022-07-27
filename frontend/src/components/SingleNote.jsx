import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {FaTrash, FaEdit, FaCheck} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addEditItem } from '../features/note/NoteSlice';
import { resetForItem } from '../features/note/NoteSlice';
import { editForNote } from '../features/note/NoteSlice';
import { useState } from 'react';
import { deleteForNote } from '../features/note/NoteSlice';

function SingleNote({note, ticketId}) {

    //Global state for user and item
    let {user} = useSelector(state => state.auth);
    let {item} = useSelector(state => state.note);
    let [text, setText] = useState("");
    let dispatch = useDispatch();


    //Click to choose note to edit
    const handleClick = (note) => {
        dispatch(addEditItem(note));
    };


    //Click not tot choose note to edit
    const backFunction = () => {
        dispatch(resetForItem());
    };

    //Update note

    const updateNote = (text, id) => {
        let updateNote = {
            text,
            noteId: id
        };

        dispatch(editForNote(updateNote));
        dispatch(resetForItem());
    };

    //Delete Note

    const deleteNote = (id) => {

        dispatch(deleteForNote(id));
        dispatch(resetForItem());
    }


  return (
    <div className="mt-5 mb-3 flex flex-row items-center justify-between w-10/12 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12">

        {item.edit === true && item.item._id === note._id ? ( <div className="w-full bg-slate-100 rounded-lg shadow-lg my-5 p-4">
        <div className="my-5 flex items-center justify-between">
        <h3 className="text-black text-bold my-3 text-2xl"> Note from {note.isStaff ? "Staff" : user.name} </h3>
         <p className="text-black text-lg font-bold"> {new Date(note.createdAt).toLocaleString("en-US")}</p>
        </div>
        <textarea name="editscript" id="editsciprt" cols="30" rows="5" className='w-full focus:outline-0 p-3' onChange={(e) => setText(e.target.value)}> </textarea>

        <div className="my-5">
            <div className="btn btn-sm bg-sky-500 focus:outline-0 text-black mr-5" onClick={() => updateNote(text, note._id)}> <FaCheck /></div>
            <div className="btn btn-sm bg-pink-500 focus:outline-0 text-black" onClick={() => backFunction()}>  <FaTrash /> </div>
        </div>
        
        </div>) : ( <div className="w-full bg-slate-100 rounded-lg shadow-lg my-5 p-4">
        <div className="my-5 flex items-center justify-between">
        <h3 className="text-black text-bold my-3 text-2xl"> Note from {note.isStaff ? "Staff" : user.name} </h3>
         <p className="text-black text-lg font-bold"> {new Date(note.createdAt).toLocaleString("en-US")}</p>
        </div>
        <p className="text-black text-lg font-bold"> {note.text} </p>

        <div className="my-5">
            <div className="btn btn-sm bg-sky-500 focus:outline-0 text-black mr-5" onClick={() => handleClick(note)}> <FaEdit /></div>
            <div className="btn btn-sm bg-pink-500 focus:outline-0 text-black" onClick={() => deleteNote(note._id)}>  <FaTrash /> </div>
        </div>
        
        </div>)}
      
       
    </div>
  )
};

SingleNote.propTypes = {
    note: PropTypes.object.isRequired,
    ticketId: PropTypes.string.isRequired
};

export default SingleNote