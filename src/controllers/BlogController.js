const BlogService = require("../services/BlogService");

module.exports = {
     add: async(req,res) => {
          const result = await BlogService.add(req.body);
          return res.json(result);
     },
     get: async(req,res) => {
          const queries = req.query;
          let result = null
          if(queries.id) {
               result = await BlogService.search(queries.id);
          }else if(queries.category){
               result = await BlogService.getByCategory(queries.category);
          }else{
               const [limit, offset] = [+req.query.limit || 50, +req.query.offset || 0];
               result = await BlogService.getAll(queries?.ops || {limit, offset});
          }
          
          return res.json(result)
     },
     update: async (req,res ) => {
          const result = await BlogService.update(req.body);
          return res.json(result);
     },
     delete: async(req,res) => {
          const {id} = req.query;
          const result = await BlogService.delete(+id);
          return res.json(result)
     }    
}