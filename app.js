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

// 2. Render Proxy Fix (CRITICAL for login persistence on Render)
if (process.env.NODE_ENV === "production") {
    app.set('trust proxy', 1);
}

// 3. Body Parsers & Static Files
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// 4. Session Configuration (Now using Postgres instead of Memory)
app.use(session({ 
  store: new pgSession({
    pool: pool,
    tableName: 'session' // Ensure you created this table via psql
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

// 5. Passport & Flash Initialization (MUST be after session)
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// 6. Global Variables Middleware (MUST be before routes)
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // Makes 'currentUser' available in all EJS
  res.locals.success_msg = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// 7. Routes (MUST be last)
app.use("/", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));