

let User = require("../models/userModel");
let Ticket = require("../models/ticketModel");
let asyncHandler = require("express-async-handler");

//@desc           Get All Tickets 
//@route          GET   /api/tickets
//@access         Private

exports.getAllTickets = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user._id);

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    };


    let tickets = await Ticket.find({ticket: req.user._id});

    res.status(200).json(tickets);

});

//@desc           Create a ticket
//@route          POST  /api/tickets
//@access         Private

exports.createTicket = asyncHandler(async (req, res, next) => {

    let {product, description} = req.body;

    if (!product || !description) {
        res.status(400)
        throw new Error("Please add product or description!")
    };

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let createdTicket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: "new"
    });

    res.status(201).json(createdTicket);
});


//@desc       Get single ticket
//@route      GET  /api/tickets/:id
//@desc       Private

exports.getSingleTicket = asyncHandler(async (req, res, next) => {
    
    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    };

    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found!")
    };

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorization")
    };

    res.status(200).json(ticket);

});



//@desc        Update Ticket
//@route       PUT    /api/tickets/:id
//@access      Private

exports.updateTicket = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User Not Found");
    };

    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found!")
    };

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Ticket not found!")
    };

    let updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updatedTicket);
});

//@desc        Delete ticket
//@route       Delete /api/tickets/:id
//@access      Private

exports.deleteTicket = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found");
    };

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("No Authorization")
    };

    await ticket.remove();

    res.status(200).json({
        success: true
    })
})




















































// const User = require("../models/userModel");
// const Ticket = require("../models/ticketModel");
// const asyncHandler = require("express-async-handler");
// const { restart } = require("nodemon");
// const { response } = require("express");

// //@desc           Get All Tickets
// //@route          GET   /api/tickets
// //@access         Private

// exports.getAllTickets = asyncHandler(async (req, res, next) => {

//     let user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(400)
//         throw new Error("User not found")
//     };

//     let tickets = await Ticket.find({user: req.user.id});

//     res.status(200).json(tickets);

// });


// //@desc         Create a ticket
// //@route        POST    /api/tickets
// //@desc        Private

// exports.createTicket = asyncHandler(async (req, res, next) => {
    
//     let {product, description} = req.body;

//     if (!product || !description) {
//         res.status(400)
//         throw new Error("Please add product and description=")
//     };

//     let user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(401)
//         throw new Error("User Not Found=")
//     };

//     let createdTicket = await Ticket.create({
//         user: req.user.id,
//         product,
//         description,
//         status: "new"
//     });

//     res.status(201).json(createdTicket);

// });


// //@desc          Get single ticket
// //@route         GET  /api/tickets/:id
// //@access        Private

// exports.getSingleTicket = asyncHandler(async (req, res, next) => {

//     let user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(401)
//         throw new Error("User not found")
//     };

//     let ticket = await Ticket.findById(req.params.id);

//     if (!ticket) {
//         res.status(404)
//         throw new Error("Ticket not found!")
//     };

//     if (ticket.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error("Not Authorized!")
//     };

//     res.status(200).json(ticket);

// });

// //@desc         Update a ticket
// //@route        PUT    /api/tickets/:id
// //@access       Private

// exports.updateTicket = asyncHandler(async (req, res, next) => {

//     let user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(401)
//         throw new Error("User not found")
//     };

//     let ticket = await Ticket.findById(req.params.id);

//     if (!ticket) {
//         res.status(404)
//         throw new Error("Ticket not found")
//     };

//     if (ticket.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error("No Authorization")
//     };

//     let updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     res.status(200).json(updatedTicket);
// });


// //@desc           Delete a ticket
// //@route          Delete  /api/tickets/:id
// //@accesss        Private

// exports.deleteTicket = asyncHandler(async (req, res, next) => {

//     let user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(401)
//         throw new Error("User not found")
//     };

//     let ticket = await Ticket.findById(req.params.id);

//     if (!ticket) {
//         res.status(404)
//         throw new Error("Ticket not found!")
//     };

//     if (ticket.user.toString() !== req.user.id) {
//         res.status(401)
//         throw new Error("Not Authorization")
//     };

//     await ticket.remove();

//     res.status(200).json({
//         success: true
//     })
// });

