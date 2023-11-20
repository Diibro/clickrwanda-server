const dbErrorHandler = (error, res, name) => {
     if(error.code === 'ER_DUP_ENTRY'){
          return res.json({status: "failed", message: `${name} already exists`});
     }else if(error.code === 'ER_BAD_NULL_ERROR'){
          return res.json({status: "failed", message: `null values detected for not null columns in the database`});
     }
     return res.json({status:"fail",error});
}

module.exports = dbErrorHandler;