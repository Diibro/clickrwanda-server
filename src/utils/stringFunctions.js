const dashReplacer = (str) => {
     if(str){
          return str.replace(/ /g, "-");
     }
}

module.exports = {dashReplacer}