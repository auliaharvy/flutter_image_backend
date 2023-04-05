var multer  = require('multer');
const path = require('path');
const client = require('../db/db.js');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },

  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}` + path.extname(file.originalname))
    //path.extname get the uploaded file extension
  }
});
const multerFilter = (req, file, cb) => {
   
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
             // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(null, true)
    
};
exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadSingleImage=async(req,res)=>{
    
  const allquery =await client.query(`INSERT INTO users(name, icon) VALUES ('${req.body.name}', '${req.file.filename}')`);  
  res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':allquery});
    
}
exports.uploadMultipleImage=async(req,res)=>{
      
  for(var i=0;i<req.files.length;i++){
    const allquery =await client.query(`INSERT INTO users(name, icon) VALUES ('${req.body.name}','${req.files[i].filename}')`);
      }
  res.status(200).json({'statusCode':200, 'status':true, message: 'All Image added','data':req.files});
}

exports.getListImage=async(req,res)=>{
    
    const allquery =await client.query(`SELECT * FROM public.users ORDER BY id ASC `);

    res.status(200).json({'statusCode':200, 'status':true, message: 'Success get list','data':allquery.rows});
}

exports.getListProvinsi=async(req,res)=>{
    
  const allquery =await client.query(`SELECT * FROM public.mst_provinsi `);

  res.status(200).json({'statusCode':200, 'status':true, message: 'Success get list','data':allquery.rows});
}

exports.getListKabupaten=async(req,res)=>{
    
  var queryText = "SELECT * FROM public.mst_kabupaten WHERE kd_prov='"+ req.query.kd_prov +"'";
  const allquery =await client.query(queryText);

  res.status(200).json({'statusCode':200, 'status':true, message: 'Success get list','data':allquery.rows});
}