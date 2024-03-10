// app create krna h
const express = require ("express");
const app = express ();
require ("dotenv").config ();
const fileUpload = require ("express-fileupload");


// Find out the port
const port = process.env.PORT || 4000;

// add middlewares
app.use (express.json());

// fileupload middleware
app.use (fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

// db se connect krna h
const dbConnect = require ("./config/database.js");
dbConnect ();

// cloudinary se connect krna h 
const clodinary = require ("./config/cloudinary.js");
clodinary.cloudinaryConnect ();

// api route mount krna h
const upload = require ("./routes/fileUpload.route.js");
// mounting
app.use ("/api/v1/upload", upload);

// activate the server
app.listen (port, () => {
    console.log (`App is running at port no ${port}`);
});