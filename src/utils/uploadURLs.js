const singleImageUrl = (req) => {
     let imageUrl = `${req.protocol}://${req.get('host')}/${req.file.destination}/${req.file.filename}`;
     return imageUrl;
}

const multiImageUrlv1 = (req) => {

}

const multiImageUrlv2 = (req) =>{
     
}


module.exports = {singleImageUrl, multiImageUrlv1, multiImageUrlv2};