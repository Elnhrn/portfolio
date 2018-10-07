var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;
var nodemailer = require('nodemailer');
require('dotenv').config();
var keys = require("./keys.js");
var bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// routes
require("./routes/htmlRoutes")(app);

// listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// nodemailer
app.post('/send', function (req, res) {
  const output = `
    <p>You have a new message from your portfolio</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: keys.gmail.email,
      pass: keys.gmail.key
    },
    tls:{
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: `${req.body.email}`,
    to: keys.gmail.email,
    subject: `Portfolio Message from: ${req.body.name}`,
    text: `${req.body.message}`,
    replyTo: `${req.body.email}`,
    html: output
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error('There was an error: ', err);
    } else {
      console.log('Message sent: ', res)
    }
  });
  res.redirect("/contact");
});