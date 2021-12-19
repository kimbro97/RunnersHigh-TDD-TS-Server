import * as multer from "multer";
import * as multerS3 from 'multer-s3'
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv'
dotenv.config()


const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
})

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'runnershigh-1',
      acl: 'public-read',
      key: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop())
      }
    })
})

export default upload


