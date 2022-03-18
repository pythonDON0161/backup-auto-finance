// server/index.js

const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');


const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
  console.log("it works!!")
});


app.get("/sendmail", (req, res) => {
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'autofinancejamaica@gmail.com',
      pass: 'E2M*u[Epfgv$GsfX'
    }
  });
 
  let mailOptions = {
    from: `${req.body.mailerState.email}`,
    to: process.env.EMAIL,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `${req.body.mailerState.message}`,
  };
 
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      console.log("it works!!")
      res.json({
        status: "success",
      });
    }
})
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});