const {Router} = require("express");
const router = Router();
const controller = require("../controllers/Userinfo");
const passport = require('passport');
const {ensureAuthenticated} = require('../middleware/auth');

router.get("/", controller.getHome);
router.get("/sign-up", controller.getSignUpForm);
router.post("/sign-up", controller.enterUserIntoDb);
router.get("/login", controller.LogInDashboard);
router.get("/logout", controller.logout);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/login",
  }));
router.get("/message", ensureAuthenticated,controller.getMessageForm);
router.post("/message", controller.submitMessage);
router.get("/join", ensureAuthenticated, controller.getJoinForm);
router.post("/join", ensureAuthenticated, controller.getjoinClub);


module.exports = router;