const bcrypt = require("bcrypt")
const db = require('../db/query');

async function getHome(req, res){
    res.render("home");
}
async function getSignUpForm(req, res) {
    res.render("signUp");
}
async function getLogin(req, res) {
    res.render("login", {user: req.user});
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
    res.redirect("/");
   }catch(err){
      res.status(401).send(`Error is this ${err}`);
   }
}
async function getMessageForm(req, res) {
    res.render("messageForm");    
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

module.exports = {
    getHome,
    getSignUpForm,
    getLogin,
    logout,
    enterUserIntoDb,
    getMessageForm,
    submitMessage
}