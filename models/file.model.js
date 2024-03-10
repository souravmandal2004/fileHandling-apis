const mongoose = require ("mongoose");

const fileSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String
    },
    tags: {
        type: String,
    },
    email: {
        type: String
    }
});

const nodemailer = require ("nodemailer");
require ("dotenv").config ();

// post middleware to send mail after the entry  is created in database
fileSchema.post ("save", async function (doc) {         // doc means the entry which is created in db
    try {
        console.log ("DOC: ", doc);


        // creating a transporter
        let transporter = nodemailer.createTransport ({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // send the mail
        let info = await transporter.sendMail ({
            from: `Sourav Mandal`,
            to: doc.email,
            subject: "New file uploaded on cloudinary", 
            html: `<h2> Hello Jee </h2> <p> File uploaded successfully </p> <br> View here: <a href="${doc.url}"> ${doc.url} </a>`
        });

        console.log (info);
    }

    catch (error) {
        console.log (error);
        // res.status (400). json ({
        //     success: false,
        //     error: error.message,
        //     message: "Error while sending the mail",
        // });
    }
});


module.exports = mongoose.model ("File", fileSchema);