const bcrypt = require("bcrypt")
const db = require('../db/query');
const { name } = require("ejs");
const { formatDistanceToNow } = require('date-fns');
const flash = require('connect-flash');
async function getHome(req, res) {
    try {
        const messages = await db.detailedMessage();

        // Use map to process every message in the list
        const processedMessages = messages.map(msg => {
            const originalName = msg.name || "Anonymous";
            
            // Apply masking logic: A****t
            const maskedName = originalName.length < 2 
                ? originalName 
                : originalName[0] + "*".repeat(originalName.length - 2) + originalName.slice(-1);

            // Return a new object: if logged in, show real name; if not, show masked
            return {
                ...msg,
                displayName: req.isAuthenticated() ? originalName : maskedName,
                relativeTime: formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })
            };
        });

        res.render("home", { messages: processedMessages, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading home page");
    }
}

async function getSignUpForm(req, res) {
    res.render("signUp");
}

async function logout(req, res, next) {
    req.logout((err) =>{
        if(err) {
            return next(err);
        }else{
            res.redirect("/");
        }
    })
}
async function enterUserIntoDb(req, res) {
   try{
    const member = false;
    const admin = false;
    const  {name, username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 5)
    if(!name || !username || !password){
        return res.status(400).send("Enter complete Details");
    }
    await db.addUserToDb(name, username, hashedPassword, member, admin);
    res.redirect("/login");
   }catch(err){
      res.status(401).send(`Error is this ${err}`);
   }
}

async function getMessageForm(req, res) {
    if(req.user.ismember){
    res.render("messageForm");
    }else{
        res.redirect("/join")
    }    
}

async function submitMessage(req, res) {
    try{
    const{message} = req.body;
    const authorId = req.user.id;
    await db.userMessages(authorId, message);
    res.redirect("/login");
    }catch(err){
        res.status(400).send(`Error hereeee ${err}`);
    }
}

async function LogInDashboard(req, res, next){
    try{
       const user = req.user;
       const message = await db.detailedMessage();
       const processedMessages = message.map(msg =>{
        const origialName = msg.name;
        return{
            ...msg,
            displayName: origialName,
            relativeTime: formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })
        }
       })
       res.render("login", {message:processedMessages, user});
       //console.log(message);
    }catch(err){
       res.status(402).send(`Error: ${err}`);
    }
    next();
}
 async function getJoinForm(req, res) {
   res.render("join-club");
 }

async function getjoinClub(req, res) {
    const {passcode} = req.body;
    const Secret = "26";

    if(passcode === Secret){
        try{
       db.club(req.user.id);
       req.user.ismember = true;
       req.flash("success_msg", "Correct! You are now a member.");
      res.redirect("/message");
    }catch(err){
        console.log(`Error: ${err}`);
    }
}else {
    req.flash("error_msg", "Incorrect passcode. Try again!");
    res.redirect("/join");
  }
}

module.exports = {
    getHome,
    getSignUpForm,
    logout,
    enterUserIntoDb,
    getMessageForm,
    submitMessage,
    LogInDashboard,
    getJoinForm,
    getjoinClub
}