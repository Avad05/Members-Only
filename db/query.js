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

module.exports = {
    getEverything,
    addUserToDb,
}