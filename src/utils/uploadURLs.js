const singleImageUrl = (req) => {
     if(req.file){
          let imageUrl = `${req.protocol}://${req.get('host')}/${req.file.destination}/${req.file.filename}`;
          return imageUrl;
     }
     return;
}

const multiImageUrlv1 = (req) => {
     if(req.files){
          const imageMain = req.files.image[0];
          const others = req.files.otherImage;
          let imageUrl = `${req.protocol}://${req.get('host')}/${imageMain.destination}/${imageMain.filename}`;
          const otherImages = [];
          for(let i = 0; i < others.length; i++){
               let otherImageUrl = `${req.protocol}://${req.get('host')}/${others[i].destination}/${others[i].filename}`;
               otherImages[i] = otherImageUrl;
          }
          return({mainImage:imageUrl, otherImages: otherImages});
     }
     return({mainImage:null, otherImages: null});
}

const multiImageUrlv2 = (req) =>{
     
}


module.exports = {singleImageUrl, multiImageUrlv1, multiImageUrlv2};