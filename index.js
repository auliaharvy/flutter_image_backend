const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();
const { Client } = require('pg');
const multer  = require('multer');
const port = process.env.PORT || 4000
// parse requests of content-type - application/json
app.use(bodyParser.json());

/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

//routes
require('./routes/image_routes')(app);
require('./routes/nasabah_routes')(app);
require('./routes/master_routes')(app);

app.use('/images',express.static('images'));
app.use('/uploads',express.static('uploads'));

app.get('/', (req, res) => { 
    res.send("Heyy!!"); 
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})