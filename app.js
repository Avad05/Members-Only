require('dotenv').config();
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session); // Added
const flash = require('connect-flash');
const passport = require('./config/passport');
const pool = require('./db/pool'); // Ensure this path is correct
const router = require("./routes/home");

const app = express();

// 1. View Engine Setup
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");


if (process.env.NODE_ENV === "production") {
    app.set('trust proxy', 1);
}


app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use(session({ 
  store: new pgSession({
    pool: pool,
    tableName: 'session' 
  }),
  secret: process.env.SESSION_SECRET || "cats",
  resave: false, 
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
  }
}));


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.currentUser = req.user; 
  res.locals.success_msg = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


app.use("/", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));