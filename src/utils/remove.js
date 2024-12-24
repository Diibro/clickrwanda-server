const { triggerAsyncId } = require('async_hooks');
const fs = require('fs');


const urlDelete = (fileUrl) => {
     let parsedUrl = new URL(fileUrl);
     try {
          fs.unlinkSync(parsedUrl.pathname.slice(1));
     } catch (error) {
          return false;
     }
     return true;
}

const multiUrlDelete = (files, res, cb) => {
     let counter = 0;
     try {
          for(let i = 0; i < files.length; i++){
               let parsedUrl = new URL(files[i]);
               fs.unlinkSync(parsedUrl.pathname.slice(1));
               
          }
     } catch (error) {
          return false;
     }
     return true;
}

module.exports = {urlDelete, multiUrlDelete};