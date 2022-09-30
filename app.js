const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
dotenv.config();
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Route for sending emails using nodemailer library.
app.post('/sendEmail', (req, res) => {
    console.log(req.body, 'data of form');
    const nodemailer = require("nodemailer");

    // Setup credentials to interact with nodemailer.
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Use preferred email service. Documentation at https://nodemailer.com/about/.
        service: 'outlook',
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3'
        },
        port: 587,
        pool: true,
        maxConnections: true,
        maxMessages: true,
        auth: {
            user: 'yourEmail@email.com', // Add email address.
            pass: 'yourEmailPassword' // Add email address account password.
        }
    })

    // For sending a message(s) as an email(s).
    const textEmail = {
        from: 'John Doe <yourEmail@email.com>', // Add name and email address.
        to: req.body.emailAddress,
        subject: req.body.emailSubject,
        text: req.body.emailMessage,
    };

    // For sending an image(s) files as an email(s).
    // const imageEmail = {
    //     from: 'John Doe <yourEmail@email.com>',
    //     to: req.body.emailAddress,
    //     subject: req.body.emailSubject,
    //     html: 'Embedded image: <img src="cid:1"/>',
    //     attachments: [{
    //         filename: '1.jpeg',  // Specify name of image file you would like to send.
    //         path: '../1.jpeg', // Specify path to image file.
    //         cid: '1' //Same cid value as in the html img src above.
    //     }]
    // }

    // Verifies connection configuration.
    transporter.verify((err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server is ready to take our messages.');
        }
    });

    // Runs the sendmail method of nodemailer to send the text email(s).
    transporter.sendMail(textEmail, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'Email successfully sent!'
            })
        }
    });

    // Runs the sendmail method of nodemailer to send the image email(s).
    // transporter.sendMail(imageEmail, (err, res) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Email(s) sent successfully!');
    //     }
    // });
});

// Runs the server on the sepcified port.
app.listen(process.env.PORT, () => {
    console.log('Server is running...');
});