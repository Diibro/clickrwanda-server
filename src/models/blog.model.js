const {dbConnection: db}= require('../configs/database.config');
const BlogQeuries = require('../sql/BlogQeuries');
const { stringfyObject } = require('../utils/jsonFunctions');

module.exports = {
     add: async (blog) => {
          return new Promise ((resolve, reject) => {
               db.query(BlogQeuries.addOne, [blog.title, stringfyObject(blog.content), blog.category, blog.publication_date], (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     }, 
     update: async (blog) => {
          return new Promise ((resolve, reject) => {
               db.query(BlogQeuries.updateOne, [blog.title, stringfyObject(blog.content), blog.category, blog.id], (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     },

     findOne: async (id) => {
          return new Promise((resolve, reject) => {
               db.query(BlogQeuries.selectOne, [id], (error,data)=> {
                    if(error) reject(error);
                    else resolve(data)
               })
          })
     },
     find: async (ops) => {
          return new Promise((resolve, reject) => {
               db.query(BlogQeuries.selectAll, [ops.limit, ops.offset], (error,data)=> {
                    if(error) reject(error);
                    else resolve(data)
               })
          })
     },
     findByCategory: async(category) => {
          return new Promise((resolve, reject) => {
               db.query(BlogQeuries.selectByCategory, [category.split('-').join(' ')], (error,data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     },
     delete: async (id) => {
          return new Promise ((resolve, reject) => {
               db.query(BlogQeuries.deleteOne, [id], (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
               })
          })
     },
     countAll: async() => {
          return new Promise((resolve,reject) => {
               db.query(BlogQeuries.countAll, (error,data) => {
                    if(error) reject(error);
                    else resolve(data[0].total);
               })
          })
     }
}