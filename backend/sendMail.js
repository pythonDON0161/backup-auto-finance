
const nodemailer = require('nodemailer');
const { parse } = require('json2csv');

const data = [{relation:"father",name:"Anakin Skywalker"},{relation:"son",name:"Luke Skywalker"}]; 

//conver the data to CSV with the column names
const csv = parse(data, ["relation","name"]);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'autofinancejamaica@gmail.com',
      pass: 'E2M*u[Epfgv$GsfX'
    }
  });


  transporter.verify((err, success) => {
    err
      ?//console.log(err)
      ://console.log(`=== Server is ready to take messages: ${success} ===`);
   });
   

   transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
     //console.log("Error " + err);
    } else {
     //console.log("Email sent successfully");
    }
   });
   

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
     //console.log("Error " + err);
    } else {
     //console.log("Email sent successfully");
    }
   });

