const dbErrorHandler = (error, res, name) => {
     if(error.code === 'ER_DUP_ENTRY'){
          return res.json({status: "fail", message: `${name} already exists`});
     }else if(error.code === 'ER_BAD_NULL_ERROR'){
          return res.json({status: "fail", message: `null values detected for not null columns in the database`});
     }
     console.log(error);
     return res.json({status:"fail",message: "Database error",error});
}

module.exports = dbErrorHandler;