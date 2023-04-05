const express = require('express');
const client = require('../db/db.js');
const controller =  require('../controllers/upload.js');
module.exports = function(app) {

//route to upload single image  
    app.post('/upload/upload-single-image', controller.upload.single('icon'),controller.uploadSingleImage);
//route to upload multiple image
    app.post('/upload/upload-multiple-image', controller.upload.array('icon', 'status', 12),controller.uploadMultipleImage);

    app.get('/list/images', controller.getListImage);

    app.get('/list/provinsi', controller.getListProvinsi);
    app.get('/list/kabupaten', controller.getListKabupaten);
    
};