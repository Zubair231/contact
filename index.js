require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path')
const port = 3000;
app.use(cors({
    origin:"*"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("env", process.env.MAIL_USER,process.env.MAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465, // Use 465 for SSL
    secure: true, // true for SSL
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  app.post('/contact-us', async (req, res) => {
    try{

        const mailOptions = {
            from: {
                name: 'KLEENA',
                address: process.env.MAIL_USER,
            },
        to: process.env.MAIL_USER, // Receiver's email address
        subject: 'New Entry: Contact Form',
        html:`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #000000; /* Black background */
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
            width: 100%;
            background-color: #000000; /* Full width black background */
        }

        #email-container {
            max-width: 800px; /* Optional: Set a maximum width */
            margin: 0 auto; /* Centering content */
            background-color: #000000;
            color: #ffffff;
            padding: 20px;
        }

        .horizontalThickBar {
            border-top: solid 4px white;
            width: 100%;
            margin: 20px 0;
        }

        .centerable {
            text-align: center;
            color: #ffffff;
        }

        .padded {
            padding: 1em;
        }

        .textie {
            color: #ffffff;
        }

        h1 {
            font-size: 1.8em;
            margin-bottom: 20px;
            color: #ffffff;
        }

        p {
            font-size: 1.1em;
            line-height: 1.6;
            color: #ffffff;
        }

        a {
            color: #ffffff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td align="center" valign="top" style="background-color: #000000; padding: 0;">
                <div id="email-container">
                    <div id="TopDiv" class="centerable">
                        <a href="https://kleenabc.com.au/">
                            <img class="top-image" src="https://www.kleenabc.com.au/wp-content/uploads/2024/09/Sizes_250-x-57-with-white-KLEENA-wording-1.png" style="line-height: 1;width: 250px; margin: 10px;" alt="Kleena">
                        </a>
                    </div>

                    <hr class="horizontalThickBar" />

                    <div id="MiddleDiv" class="centerable padded">
                        <div id="MidofMiddle" class="textie">
                            <h1>New Contact Form Entry</h1>
                            <p>
                                Hi Admin,<br><br>
                                You have received a new entry in the contact form from a customer.<br><br>
                                <strong>Customer Name:</strong> ${req.body.name}<br>
                                <strong>Email:</strong> ${req.body.email}<br>
                                <strong>Phone Number:</strong> ${req.body.phoneNumber}<br>
                                <strong>Message:</strong> ${req.body.message}
                            </p>
                        </div>
                    </div>

                    <hr class="horizontalThickBar" />
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`,
      };
      
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
}catch(e){
    console.log("e", e);
    
    res.status(500).send({
        success:false,
        messaeg:e || "Error"
    });

}

  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });