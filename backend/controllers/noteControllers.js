
let Note = require("../models/noteModel");
let User = require("../models/userModel");
let Ticket = require("../models/ticketModel");

let asyncHandler = require("express-async-handler");

//@desc      Get All Notes
//@route     GET  /api/tickets/:ticketId/notes
//@access    Private

exports.getAllNotes = asyncHandler(async (req, res, next) => {
    
    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found!")
    };

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized");
    };

    let notes = await Note.find({ticket: req.params.ticketId}).populate("user");

    res.status(200).json(notes);
});

//@desc        Create a note
//@route       POST    /api/tickets/:ticketId/notes
//@access      Private

exports.createNote = asyncHandler(async (req, res, next) => {

    let {text} = req.body;

    if (!text) {
        res.status(400)
        throw new Error("Please add a text");
    };

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found!")
    };

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    };

    let note = await Note.create({
        user: req.user.id,
        ticket: req.params.ticketId,
        text,
        isStaff: false
    });

    res.status(201).json(note);
})

//@desc       Update a note
//@route      PUT   /api/notes/:id
//@access     Private

exports.updateNote = async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    }

    let note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404)
        throw new Error("Note not found!")
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized!")
    };

    let updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updateNote)
};

//@desc        Delete a note
//@route       DELETE  /api/notes/:id
//@access      Private

exports.deleteNote = async (req, res, next) => {
    
    let user = await User.findById(req.user.id);

    if (!user) {
        res.statu(401)
        throw new Error("User not found!")
    };

    let note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404)
        throw new Error("Note not found!")
    };

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized!")
    };

   let deleteNote = await Note.findByIdAndRemove(req.params.id);

    res.status(200).json(deleteNote);
};