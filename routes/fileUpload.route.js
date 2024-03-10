const express = require ("express");
const router = express.Router ();

// importing all the controllers
const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require ("../controllers/fileUpload.controller.js");

// api routes
router.post ("/localfileupload", localFileUpload);
router.post ("/imageupload", imageUpload);
router.post ("/videoupload", videoUpload);
router.post ("/imagereducerupload", imageReducerUpload);


// export the router
module.exports = router;