// server/index.js

const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');

const { parse } = require('json2csv');

const PORT = process.env.PORT || 3001;

const app = express();

const data = [{relation:"father",name:"Anakin Skywalker"},{relation:"son",name:"Luke Skywalker"}]; 

//conver the data to CSV with the column names
const csv = parse(data, ["relation","name"]);


// middleware
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
  console.log("it works!!")
});


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'autofinancejamaica@gmail.com',
    pass: 'fuzubaizvurjsvwb' 
  }
});

app.get("/sendmail", (req, res) => {
  
  let mailOptions = {
    from: `${req.body.mailerState.email}`,
    to : `${req.body.receiverMail}`,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `${req.body.mailerState.message}`,
  }; 

  res.json({ status: "Email sent" });
  console.log(csv)
  /*
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) { res.json({ status: "fail",}); } 
       else {  console.log("== Message Sent =="); console.log("it works!!")
        res.json({
          status: "success",
        }); } })
  */
      console.log("hello")

})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});