
import axios from "axios";

const API_URL = "/api/tickets/";

const createTicket = async (ticketData, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.post(API_URL, ticketData, config);

    return response.data;


};

const getTickets = async (token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL, config);

    return response.data;
};

const getSingleTicket = async (id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL + id, config);

    return response.data; 
};


const updateTicket = async (id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.put(API_URL + id, {
        status: "closed"
    }, config);


    return response.data;

};

const TicketService = {
    createTicket,
    getTickets,
    getSingleTicket,
    updateTicket
};

export default TicketService;




























