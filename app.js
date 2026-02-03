require('dotenv').config();
require('./config/passport')
const express = require('express');
const path = require('node:path');
const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = require("./routes/home");
const flash = require('connect-flash');

const app = express();

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
//connect-flash library used here
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error_msg') || "";
  res.locals.error = req.flash('error') || "";
  next();
});

app.listen(8000, console.log('running on port 8000'))
