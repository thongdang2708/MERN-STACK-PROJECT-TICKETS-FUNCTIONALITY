
const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["Iphone", "Macbook Pro", "Ipad", "Ipad Mini"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "opening", "closed"],
        default: "new"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Ticket", TicketSchema);


