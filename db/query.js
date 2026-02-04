const pool = require('../db/pool');

async function getEverything() {
    const {rows} = await pool.query('SELECT * FROM userinfo')    
}
async function addUserToDb(name, username, password, member, admin) {
    await pool.query('INSERT INTO userinfo (name, username, password, ismember, isadmin) VALUES ($1, $2, $3, $4, $5)', 
        [name, username, password, member, admin]
    );  
}
async function showLOmessages() {
    await pool.query('SELECT * FROM messageinfo');
}

async function userMessages(user, message) {
     await pool.query('INSERT INTO messageinfo (mess_id, message) VALUES ($1, $2)',
        [user, message]
     );
}

async function detailedMessage() {
    const messages = await pool.query('SELECT userinfo.name, messageinfo.message, messageinfo.created_at FROM userinfo INNER JOIN messageinfo ON messageinfo.mess_id = userinfo.id ORDER BY messageinfo.created_at DESC');
    return messages.rows;
}

async function club(userid) {
    await pool.query('UPDATE userinfo SET ismember = true WHERE id = $1', [userid]);
}

module.exports = {
    getEverything,
    addUserToDb,
    showLOmessages,
    userMessages,
    detailedMessage,
    club
}