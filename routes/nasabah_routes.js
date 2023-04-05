const express = require('express');
const client = require('../db/db.js');
const controller =  require('../controllers/nasabah.js');
module.exports = function(app) {

//route to upload nasabah  
    app.post('/posting/nasabah', controller.upload,controller.postingDataNasabah);
    app.post('/delete/nasabah', controller.deleteDataNasabah);

    app.get('/list/nasabah', controller.getListNasabah);
};