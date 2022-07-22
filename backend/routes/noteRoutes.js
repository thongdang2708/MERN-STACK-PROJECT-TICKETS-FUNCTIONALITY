
let express = require("express");

let {getAllNotes, createNote, updateNote, deleteNote} = require('../controllers/noteControllers');

let {protect} = require("../middleware/auth");

let router = express.Router({mergeParams: true});

router.route("/").get(protect, getAllNotes).post(protect, createNote);

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;