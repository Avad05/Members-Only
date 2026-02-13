const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy;
const pool = require('../db/pool');
const bcrypt = require('bcrypt')

passport.use(
  new LocalStratergy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM userinfo WHERE username = $1", [username]);
      const user = rows[0];      

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM userinfo WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

module.exports = passport;
