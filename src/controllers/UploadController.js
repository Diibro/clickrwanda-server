const UploadService = require("../services/uploadService");

module.exports = {
     uploadFile: async(req,res) => {
          try {
               const info  = req.body;
               const result  = await UploadService.uploadFile(req.file, info.folderName);
               return res.json(result);
          } catch (error) {
               console.log(error);
               return {status: "fail", message:"Error uploading the file", data:null }
          }
     },
     uploadMany: async(req,res) => {
          try {
               const info = req.body;
               const result = await UploadService.uploadMany(req.files, info.folderName);
               return res.json(result);
          } catch (error) {
               console.log(error);
               return {status:"fail", message: "Error uploading the images",data: null}
          }
     }
}