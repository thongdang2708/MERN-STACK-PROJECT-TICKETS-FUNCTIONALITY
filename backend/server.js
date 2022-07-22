
const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const {errorHandler} = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();
const noteRoute = require("./routes/noteRoutes")

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/notes", noteRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`.green.underline.bold);
});