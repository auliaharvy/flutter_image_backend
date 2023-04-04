var multer  = require('multer');
const path = require('path');
const client = require('../db/db.js');
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/nasabah');
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
exports.postingDataNasabah=async(req,res)=>{
    
 const allquery =await client.query(`INSERT INTO nasabah(nik, nama, alamat, no_hp, kd_prov, kd_kab, foto_profile, foto_ktp, hobi, gaji) VALUES ('${req.body.nik}', 
 '${req.body.nama}', '${req.body.alamat}','${req.body.no_hp}','${req.body.kd_prov}','${req.body.kd_kab}','${req.body.foto_profile}','${req.body.foto_ktp}','${req.body.hobi}','${req.body.gaji}',)`);
    
 res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]});
    
}