const  AWS = require('aws-sdk');

const s3 = new AWS.S3({
     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     region: process.env.AWS_REGION,
});

const s3Config = {
     bucketName: process.env.S3_BUCKET_NAME,
     dirName: 'adverts',
     region: process.env.AWS_REGION,
     s3Url: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.S3_BUCKET_NAME}/`,
};

module.exports = {
     s3,s3Config
}


