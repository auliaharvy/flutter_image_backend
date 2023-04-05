var multer  = require('multer');
const path = require('path');
const client = require('../db/db.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     if (file.fieldname === "foto_profile") {
         cb(null, './uploads')
     }
     else if (file.fieldname === "foto_ktp") {
         cb(null, './uploads');
     }
  },
  filename:(req,file,cb)=>{
      if (file.fieldname === "foto_profile") {
          cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      }
    else if (file.fieldname === "foto_ktp") {
      cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  }
});

function checkFileType(file, cb) {
  if (file.fieldname === "foto_ktp") {
      if (
          file.mimetype === 'application/pdf' ||
          file.mimetype === 'application/msword' ||
          file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
  }
  else if (file.fieldname === "foto_profile") {
      if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'||
          fiel.mimetype==='image/gif'
        ) { // check file type to be png, jpeg, or jpg
          cb(null, true);
        } else {
          cb(null, false); // else fails
        }
      }
  }

  exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
  }).fields(
    [
        {
            name:'foto_profile',
            maxCount:1
        },
        {
            name: 'foto_ktp', maxCount:1
        },
    ]
  );
            
  exports.postingDataNasabah=async(req,res)=>{    
    const allquery =await client.query(`INSERT INTO nasabah(nik, nama, alamat, no_hp, kd_prov, kd_kab, foto_profile, foto_ktp, hobi, gaji) VALUES ('${req.body.nik}', '${req.body.nama}', '${req.body.alamat}', '${req.body.no_hp}', '${req.body.kd_prov}', '${req.body.kd_kab}', '${req.files.foto_profile[0].path}', '${req.files.foto_ktp[0].path}', '${req.body.hobi}', '${req.body.gaji}')`);
    res.status(200).json({'statusCode':200, 'status':true, message: 'Image added','data':[]});
      
  }

  exports.deleteDataNasabah=async(req,res)=>{   
    var queryText = "DELETE FROM nasabah WHERE id='"+ req.query.id +"'";
    const allquery =await client.query(queryText);
    res.status(200).json({'statusCode':200, 'status':true, message: 'Image Deleted','data':[]});
      
  }

  exports.getListNasabah=async(req,res)=>{
    
    const allquery =await client.query(`SELECT * FROM public.nasabah `);
  
    res.status(200).json({'statusCode':200, 'status':true, message: 'Success get list','data':allquery.rows});
  }