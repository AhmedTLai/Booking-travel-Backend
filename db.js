const d = require('mysql')

const db = d.createConnection({
    user : 'sql11660518',
    host: 'sql11.freemysqlhosting.net',
    database : 'sql11660518' ,
    password : 'jM5GBTbf1h',
    port : '3306'
})


module.exports = db   