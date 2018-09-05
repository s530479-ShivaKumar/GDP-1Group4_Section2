var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
var bodyParser = require("body-parser"); // simplifies access to request body
var app = express();  // make express app
var http = require('http').Server(app);  // inject app into the server
var nodemailer = require('nodemailer');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'Assets')));
app.use(favicon(path.join(__dirname,'Images','favicon.ico')));
app.use(express.static(__dirname + '/Views'));
// set up an http request logger to log every request automagically
app.use(logger("dev"));     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/mail",function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Projectteamsec02group04@gmail.com',
      pass: 'Projectteam05'
    }
  });
  var mailOptions = {
    from: 'mutukulashiva099@gmail.com',
    to: req.body.email1,
    subject: 'Collecting performers details',
    text: 'Hello,',
    html: '<p>Hello,</p><p>Please fill the basic information form.</p><p>Here is the link for form :<a href="http://127.0.0.1:8089/basic"> Click here</a></p></br><p>Regards</p>',  
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Mail Sent Successfully');
    }
  });
    // var api_key = 'key-40415a0687ee485304994a7878f9a4a0';
    // var domain = 'sandboxaeb7264ac0c34508b90f37828951db15.mailgun.org';
    // var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    // var data = {
    //   from: 'Stephi Designer <me@samples.mailgun.org>',
    //   to: 's530479@nwmissouri.edu',
    //   subject: "Collecting performers details",
    //   text: "Please fill the basic information form"
    // };
     
    // mailgun.messages().send(data, function (error, body) {
    //   console.log(body);
    //   if(!error)
    //     response.send("Mail Sent Successfully");
    //   else
    //     response.send("Mail not sent please check again");
    // });
  })



const routes = require('./routes/index.js')
app.use('/', routes)

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);

//mail
app.post("/mail",function(request, response){
  var api_key = 'key-40415a0687ee485304994a7878f9a4a0';
  var domain = 'sandboxaeb7264ac0c34508b90f37828951db15.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  
  var data = {
    from: 'Stephi Designer <me@samples.mailgun.org>',
    to: 's530479@nwmissouri.edu',
    subject: "Collecting performers details",
    html:' Hello '.concat(' , <br /></br > Please fill the basic information form. <br /> Here is the link for form : <a href="http://localhost:8089/basic">Click here</a><br /><br /> Best Regards.')
    
  };
  
  mailgun.messages().send(data, function (error, body) {
    
    if(!error)
      response.send("Mail Sent Successfully");
    else
      response.send("Mail not sent please check again");
  });
})

// if we get a 404 status, render 404.ejs view
app.use(function (request, response) {
  response.status(404).render('404.ejs');
});

// Set Port
app.set('port', (process.env.PORT || 8089));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

//**********