
const express = require('express')
const app = express()

const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

//-----Configure S3 bucket--------------
let  s3 = new aws.S3(); 
aws.config.update({ 
    secretAccessKey: 'your aws secret access key', 
    accessKeyId: 'your aws access key id',
    region: 'provide region of bucket'
});
//-------------------------------------

//-----Initialize s3 multer for file uplaod-------
let uploads3 = multer({ storage: multerS3({      
        s3: s3,
        bucket: 'bucket name',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            //validate here for file type
            if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' ||                        file.mimetype == 'image/jpeg' || file.mimetype == 'image/tiff' || file.mimetype == 'image/bmp'){
            file.originalname =  'file-'+Date.now()+'-'+file.originalname
            cb(null, file.originalname) //use Date.now() for unique file keys
            }
        }
    })
});


app.post('/uploadFile', uploads3.any(), async (req, res, next)=>{
    let paths =  await req.files.map((v,i)=>{
        return v.location;
    });

    res.send(paths)
}) 
