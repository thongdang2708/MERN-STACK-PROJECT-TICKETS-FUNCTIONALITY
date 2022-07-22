
const express = require("express");

const {getAllTickets, createTicket, getSingleTicket, updateTicket, deleteTicket} = require("../controllers/ticketController");

const {protect} = require("../middleware/auth");

let noteRoutes = require("./noteRoutes");
const router = express.Router();

router.use("/:ticketId/notes", noteRoutes);
router.route("/").get(protect, getAllTickets).post(protect, createTicket);

router.route("/:id").get(protect, getSingleTicket).put(protect, updateTicket).delete(protect, deleteTicket);


module.exports = router;