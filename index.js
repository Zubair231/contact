require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path')
const port = 3000;
app.use(cors());
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
        html: `
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <style>
                  #MainDiv {
                      width: 100%;
                      text-align: center;
                      display: flex;
                      justify-content: center;
                  }
      
                  #EncompassingDiv {
                      border: 2px solid #EEEFEC;
                  }
      
                  .horizontalThickBar {
                      border-top: solid 4px black;
                      width: 100%;
                      text-align: center;
                  }
      
                  .centerable {
                      text-align: center;
                      color: #555559;
                      font-family: Arial, sans-serif;
                      font-size: 1.05em;
                  }
      
                  .padded {
                      padding: 1em;
                  }
      
                  .textie {
                      color: #555559;
                      font-family: Arial, sans-serif;
                      font-size: 1.05em;
                  }
      
                  .button {
                      color: #ffffff;
                      background-color: #131F28;
                      border: 20px solid #131F28;
                      border-left: 20px solid #131F28;
                      border-right: 20px solid #131F28;
                      border-top: 10px solid #131F28;
                      border-bottom: 10px solid #131F28;
                      border-radius: 3px;
                      text-decoration: none;
                  }
      
                  .margined {
                      margin: 1em;
                  }
              </style>
          </head>
          <body>
              <div id="MainDiv">
                  <div id="EncompassingDiv">
                      <div id="TopDiv" class="centerable">
                          <a href="https://kleenabc.com.au/">
                              <img class="top-image" src="https://www.kleenabc.com.au/wp-content/uploads/2024/09/Sizes_250-x-57-with-white-KLEENA-wording-1.png" style="line-height: 1;width: 250px; margin: 10px;" alt="Kleena">
                          </a>
                      </div>
      
                      <hr class="horizontalThickBar" />
      
                      <div id="MiddleDiv" class="centerable padded">
                          <div id="MidofMiddle" class="textie" style="margin-left: 15%; margin-right: 15%">
                              <h1>New Contact Form Entry</h1>
                              <p>
                                  Hi Admin,<br><br>
                                  You have received a new entry in the contact form from a customer.<br><br>
                                  <strong>Customer Name:</strong> ${req.body.name}<br>
                                  <strong>Email:</strong> ${req.body.email}<br>
                                  <strong>Message:</strong> ${req.body.message}
                              </p>
                          </div>
                      </div>
      
                      <hr class="horizontalThickBar" />
      
                     
                  </div>
              </div>
          </body>
          </html>
          `,
      };
      
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
}catch(e){
    console.log("e", e);
    
    res.status(500).send(`${e}`);

}

  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });