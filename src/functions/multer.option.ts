import multer from "multer";
import * as multerS3 from 'multer-s3'
import * as aws from 'aws-sdk'
import { Injectable, UnprocessableEntityException } from "@nestjs/common";

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
})

@Injectable()
export class MulterS3 {
  private readonly awsS3: aws.S3
  constructor() {
    this.awsS3 = new aws.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION
    })
  }
   async uploadImage(folder: string,file: Express.Multer.File) {
    const key = `${folder}/${Date.now()}.${file.originalname.split('.').pop()}`
    await this.awsS3
    .putObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype
    }).promise()
    return `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${key}`       
     
  }
}