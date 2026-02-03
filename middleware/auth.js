const flash = require('connect-flash');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      // User is logged in, move to the next function (the controller)
      return next();
    }
    // User is logged out, set a flash message and redirect
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
  }
};