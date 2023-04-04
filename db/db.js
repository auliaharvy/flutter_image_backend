const { Client } = require('pg');
const client = new Client({
    user: 'root',
    host: '38.47.180.138',
    database: 'flutter_image',
    password: 'surya2023',
    port: 5432,
});
client.connect().then(console.log("Connected to DB"))
.catch((err)=>{console.log("Something went wrong!",err.message)});
module.exports = client;