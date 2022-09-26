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

app.get('/', (req, res) => {
    console.log('Hello!');
});

app.post('/sendEmail', (req, res) => {
    console.log(req.body, 'data of form');
    const nodemailer = require("nodemailer");

    // Main function for sending emails.

    // Setup credentials to interact with nodemailer.
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
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
            user: 'yourEmail@email.com',
            pass: 'yourEmailPassword'
        }
    })

        /* Specify the recipient(s) email addresses that you would like to send emails to. If specifying multiple
            recipients, seperate each email address with a coma. Make sure email addresses are strings.
            Ex. const emailList = ['johndoe@gmail.com', 'janedoe@gmail.com', 'joshdoe@gmail.com'] etc... */
        // const emailList = ['kyledavis109@gmail.com']

    // For sending a message(s) as an email(s).
    const textEmail = {
        from: 'John Doe <yourEmail@email.com>',
        to: req.body.emailAddress,
        subject: req.body.emailSubject,
        text: req.body.emailMessage,
        html: "<b>This is a test.</b>"
    };

    // // For sending an image(s) files as an email(s).
    // const imageEmail = {
    //     from: 'John Doe <a.0a5@outlook.com>',
    //     to: emailList,
    //     subject: 'Test',
    //     html: 'Embedded image: <img src="cid:kyle"/>',
    //     attachments: [{
    //         filename: '1.jpeg',  // Specify name of image file you would like to send.
    //         path: '../1.jpeg', // Specify path to image file.
    //         cid: 'kyle' //Same cid value as in the html img src above.
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
//     transporter.sendMail(imageEmail, (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Email(s) sent successfully!');
//         }
//     });
});


app.listen(process.env.PORT, () => {
    console.log('Server is running...');
});