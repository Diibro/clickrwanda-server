const { s3Config, s3 } = require("../configs/aws-config");
const {v4: uuidv4} = require('uuid');

module.exports = {
     uploadFile: async(file, folder) => {
          console.log(file);
          const uniqueKey = `${uuidv4()}-${file.originalname}`;
          const filePath = `${folder}/${uniqueKey}`
          
          try {
               const params = {
                    Bucket: s3Config.bucketName,
                    Key: filePath,
                    Body: file.buffer,
                    ACL: 'public-read',
                    ContentType: file.mimetype,
               };
               const response = await s3.upload(params).promise();
               const {Location} = response;
               return {status: "pass", message: "successfully uploaded the file", data: Location};
          } catch (error) {
               throw error
          }
     },
     uploadMany: async (files, folder) => {
          const fileUrls = [];
          if (files && files.length > 0) {
               for (const file of files) {
                    const uniqueKey = `${uuidv4()}-${file.originalname}`;
                    const filePath = `${folder}/${uniqueKey}`;
          
                    try {
                         const params = {
                         Bucket: s3Config.bucketName,
                         Key: filePath,
                         Body: file.buffer,
                         ACL: 'public-read',
                         ContentType: file.mimetype,
                         };
                         const response = await s3.upload(params).promise();
                         const { Location } = response;
                         fileUrls.push(Location);
                    } catch (error) {
                         console.error(`Error uploading file ${file.originalname}:`, error);
                    }
               }
               return { status: "pass", message: "successfully uploaded all files", data: fileUrls };
          }else{
               return {status: 'fail', message: "error uploading the files", data: []}
          }
          
     }
}

