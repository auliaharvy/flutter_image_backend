const express = require('express');
const client = require('../db/db.js');
const controller =  require('../controllers/master.js');
module.exports = function(app) {

//route 
    app.post('/posting/provinsi', controller.postingDataProvinsi);
    app.post('/posting/kabupaten', controller.postingDataKabupaten);

    app.get('/list/provinsi', controller.getListProvinsi);
    app.get('/list/kabupaten', controller.getListKabupaten);

    app.post('/update/provinsi', controller.updateProvinsi);
};