const express = require('express');
const client = require('../db/db.js');
const controller =  require('../controllers/upload.js');
module.exports = function(app) {

//route to upload nasabah  
    app.post('/posting/nasabah', controller.posting.single('icon'),controller.uploadSingleImage);
    
};