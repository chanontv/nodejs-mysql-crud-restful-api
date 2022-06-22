const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ics',
    port:'3306'
})

db.connect((err) => {
    if(err){
        console.log('Error connecting to database = ',err);
        return;
    }
    console.log('connect success.');
})

module.exports = db;