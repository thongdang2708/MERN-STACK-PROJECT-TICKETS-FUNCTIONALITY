

const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        let conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo database connect: ${conn.connection.host}`.cyan.underline);


    } catch (err) {
        console.log(`Error: ${err.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = connectDB;
