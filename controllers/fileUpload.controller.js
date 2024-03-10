const File = require ("../models/file.model.js");
const cloudinary = require ("cloudinary").v2;

// localFileUpload Handler
exports.localFileUpload = async (req, res) => {
    try {
        // Fetch the file
        const file = req.files.file;
        console.log ("The file is: ", file);
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file provided"
            });
        }

        // store in a path
        let path = __dirname + "/files/" + Date.now () + `.${file.name.split('.')[1]}`;
        console.log ("Path: ", path);

        // // Create the 'files' directory if it doesn't exist
        // if (!fs.existsSync(__dirname + "/files/")) {
        //     fs.mkdirSync(__dirname + "/files/");
        // }

        // move the file to the desired path
        file.mv (path, (error) => {
            console.log (error);
        });

        res.json ({
            success: true,
            message: "Local file uploaded successfully"
        });
    }

    catch (error) {
        console.log (error);
    }
};

function isFileTypeSupported (type, supportedTypes) {
    return supportedTypes.includes (type);
}

// function to upload on cloudinary
async function uploadFileToCloudinary (file, folder, quality) {
    const options = {
        folder
    };  

    if (quality) {
        options.quality = quality;
    }


    options.resource_type = "auto";

    return await cloudinary.uploader.upload (file.tempFilePath, options);
}

// imageUpload
exports.imageUpload = async (req, res) => {
    try {
        // fetch the data
        const {name, tags, email} = req.body;
        console.log (name, tags, email);

        const file = req.files.imageFile;
        console.log (file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase ();
        console.log (fileType);

        if (!isFileTypeSupported (fileType, supportedTypes)) {
            // If the file format is not supported
            return res.status (400). json ({
                success: false, 
                message: "File format is not supported!"
            });
        }

        // If the file format is supported
        // upload to the cloudinary
        const response = await uploadFileToCloudinary (file, "Mandal");
        console.log (response);

        // save entry to db
        const fileData = await File.create ({
            name, tags, email, 
            url: response.secure_url,
        });

        res.json ({
            success: true, 
            message: "File succesfully uploaded to cloudinary",
            url: response.secure_url
        });
        
    }

    catch (error) {
        console.log (error);
        res.status (400). json ({
            success: false,
            error: error.message,
            
        });
    }
};

// videoUpload
exports.videoUpload = async (req, res) => {
    try {
        // fetch the data
        const {name, tags, email} = req.body;
        console.log (name, tags, email);

        // Fetch the video file
        const file = req.files.videoFile;

        // validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase ();
        console.log (fileType);

        if (!isFileTypeSupported (fileType, supportedTypes)) {
            // If the file format is not supported
            return res.status (400). json ({
                success: false, 
                message: "File format is not supported!"
            });
        }
        // If the file format is supported
        // upload to the cloudinary
        const response = await uploadFileToCloudinary (file, "Mandal");
        console.log (response);


        // save entry to db
        const fileData = await File.create ({
            name, tags, email, 
            url: response.secure_url,
        });

        res.json ({
            success: true, 
            message: "Video succesfully uploaded to cloudinary",
            url: response.secure_url
        });
    }

    catch (error) {
        console.log (error);
        res.status (400). json ({
            success: false,
            error: error.message,
            message: "Aa gya error"
        });
    }
};

// imageReducerUpload
exports.imageReducerUpload = async (req, res) => {
    try {

        // fetch the data
        const {name, tags, email} = req.body;
        console.log (name, tags, email);

        const file = req.files.imageFile;
        console.log (file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase ();
        console.log (fileType);

        if (!isFileTypeSupported (fileType, supportedTypes)) {
            // If the file format is not supported
            return res.status (400). json ({
                success: false, 
                message: "File format is not supported!"
            });
        }


        // If the file format is supported
        // upload to the cloudinary
        const response = await uploadFileToCloudinary (file, "Mandal", 30);
        console.log (response);

        // save entry to db
        const fileData = await File.create ({
            name, tags, email, 
            url: response.secure_url,
        });

        res.json ({
            success: true, 
            message: "File succesfully uploaded to cloudinary",
            url: response.secure_url
        });
    }

    catch (error) {
        console.log (error);
        res.status (400). json ({
            success: false, 
            error: error.message,
            message: "Image can't be uploaded"
        });
    }
};