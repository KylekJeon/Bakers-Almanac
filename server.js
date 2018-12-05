const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
// Parses through request and parses urlencoded request types
app.use(bodyParser.urlencoded({extended: false}));
// Parses through request and parses json request types
app.use(bodyParser.json());

// DB Config
// Store mongodb connection uri in config files to not be hard-coded and visible
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose allows easier use of MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
// initialize passport, pass in as middleware to app.
app.use(passport.initialize());

// Passport Config
// config/passport exports a function, where the parameter passed in is the passport object itself.
// the function will set up passport with the proper strategies 
require('./config/passport')(passport);


// Use Routes
// Sets up backend routes for resources. 
// Because app.use('/api/#resource', #resource) is set up in server.js
// Within the router in the resource routes themselves, they do not have to
// Include /api/users, this will be the root route for the resources,
// And their url will be /api/#resource
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// process.env.PORT for heroku deployment
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
