require("dotenv").config();
const {Client} = require("pg");


const SQL = 
    `INSERT INTO userinfo (name, username, password, ismember, isadmin)
    VALUES ('ben', 'benten', '!@#$%^&*!@', false, false)`; 

async function main(){
    try{
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done');
}catch(err){
    console.log(`Postgres Not connected ${err}`);
}
}

main();