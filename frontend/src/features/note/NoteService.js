

import axios from "axios";

const API_URL = "/api/tickets/";
const NOTE_URL = "/api/notes/";

//Display notes

const showNotes = async (ticketId, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL + ticketId + "/notes", config);

    return response.data;
};

//Add notes

const addNotes = async (noteValue, id, token) => {
    
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.post(API_URL + id + "/notes", {
        text: noteValue
    }, config);

    return response.data;
};

//Edit note

const editNote = async (noteText, id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.put(NOTE_URL + id, {
        text: noteText
    }, config)

    return response.data;
};

//Delete note

const deleteNote = async (id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.delete(NOTE_URL + id, config);

    
    return response.data;
};

const NoteService = {
    showNotes,
    addNotes,
    editNote,
    deleteNote
};

export default NoteService;