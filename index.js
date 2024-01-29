const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error(err);
    }
};

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("App listening on port", process.env.PORT);
});
