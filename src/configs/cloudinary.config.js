const cloudinary = require('cloudinary').v2;

cloudinary.config({
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
     secure:true
});

const folders = {
     mainFolder: 'clickrwanda',
     adverts: 'clickrwanda/adverts',
     categories: 'clickrwanda/categories',
     logos: 'clickrwanda/logos',
     payplans: 'clickrwanda/pay-plans',
     quotations: 'clickrwanda/quotations',
}

module.exports = {cloudinary, folders};
