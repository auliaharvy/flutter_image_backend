var multer  = require('multer');
const path = require('path');
const client = require('../db/db.js');

  //create
  exports.postingDataProvinsi=async(req,res)=>{
    console.log(req)
    const allquery =await client.query(`INSERT INTO mst_provinsi(kd_prov, nama_prov) VALUES ('${req.body.kd_prov}', '${req.body.nama_prov}')`);
    res.status(200).json({'statusCode':200, 'status':true, message: 'Provinsi added','data':[]});
  }

  exports.postingDataKabupaten=async(req,res)=>{    
    console.log(req)
    const allquery =await client.query(`INSERT INTO mst_kabupaten(kd_prov, kd_kab, description) VALUES ('${req.body.kd_prov}', '${req.body.kd_kab}', '${req.body.description}')`);
    res.status(200).json({'statusCode':200, 'status':true, message: 'Kabupaten added','data':[]});
  }

  //read
  exports.getListProvinsi=async(req,res)=>{
    
    const allquery =await client.query(`SELECT * FROM public.mst_provinsi `);
  
    res.status(200).json({'statusCode':200, 'status':true, message: 'Success get list','data':allquery.rows});
  }
  
  exports.getListKabupaten=async(req,res)=>{
      
    var queryText = "SELECT * FROM public.mst_kabupaten WHERE kd_prov='"+ req.query.kd_prov +"'";;
    const allquery =await client.query(queryText);
  
    res.status(200).json({'statusCode':200, 'status':true, message: 'Success get list','data':allquery.rows});
  }

  //update
  exports.updateProvinsi=async(req,res)=>{
    console.log(req)
    var queryText = "UPDATE mst_provinsi SET kd_prov='"+ req.body.kd_prov +"' WHERE kd_prov='"+ req.query.kd_prov +"'";
    const allquery =await client.query(queryText);
  
    res.status(200).json({'statusCode':200, 'status':true, message: 'Success Update Provinsi','data':allquery});
  }