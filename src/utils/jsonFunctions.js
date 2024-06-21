exports.stringfyObject = (obj) => {
     try {
          if(obj){
               if(typeof(obj) === 'string'){
                    return obj
               }else{
                    return JSON.stringify(obj)
               }
          }else{
               return null;
          }
     } catch (error) {
          return null;
     }
} 