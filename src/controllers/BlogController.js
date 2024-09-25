const BlogService = require("../services/BlogService");

module.exports = {
     add: async(req,res) => {
          const result = BlogService.add(req.body);
     },
     get: async(req,res) => {
          const queries = req.query;
          let result = null
          if(queries.id) {
               res = await BlogService.search(queries.id);
          }else if(queries.category){
               res = await BlogService.getByCategory(queries.category);
          }else if(queries.ops) {
               res = await BlogService.getAll(queries.ops)
          }
          
          return res.json(result)
     },
     update: async (req,res ) => {
          const result = await BlogService.update(req.body);
          return res.json(result);
     },
     delete: async(req,res) => {
          const {id} = req.body;
          const result = await BlogService.delete(id);
          return res.json(result)
     }    
}