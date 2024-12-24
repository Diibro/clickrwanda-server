const Blog = require('../models/blog.model');

module.exports = {
     add: async (blog) => {
          try {
               const res = await Blog.add(blog);
               if(res) {
                    return {status: 'pass', message: "Successfully added new blog"};
               }else {
                    return {status: "fail", message: "Server error"};
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: 'Error adding new blog'}
          }
     },
     update: async(blog) => {
          try {
               const res = await Blog.update(blog);
               if(res) {
                    return {status: "pass", message: "Successfully updated the blog"}
               }else{
                    return {status: "fail", message: "Error updating the blog. Try again"}
               }
          } catch (error) {
               console.log(error);
               return {status:"fail", message: "failed to update the blog"};
          }
     },
     search: async(id) => {
          try {
               const res = await Blog.findOne(id);
               if(res) {
                    return {status: "pass", message: "sucess fetching blog info", data: res[0]}
               }else {
                    return {status: 'fail', message: "blog not found"}
               }
          } catch (error) {
               console.log(error);
               return {status: "fail", message: "error fetching blog data"}
          }
     },
     getAll: async(ops) => {
          try {
               const res = await Blog.find(ops);
               if(res) {
                    return {status: 'pass', message: "success fetching blogs", data:res}
               }else {
                    return {status: 'fail', message: 'No blogs found'}
               }
          } catch (error) {
               console.log(error);
               return {status: 'fail', message: "error fetching blogs"}
          }
     },
     getByCategory: async(category) =>  {
          try{
               const res = await Blog.findByCategory(category);
               if(res) {
                    return {status:'pass', message: 'success fetching category blogs', data:res}
               }else {
                    return {status: 'fail', message: 'error fetching category blogs'}
               }
          }catch(error) {
               console.log(error);
               return {status: "fail", message: "error fetching category blogs"}
          }
     },
     delete: async(id) => {
          try{
               const res = await Blog.delete(id);
               if(res) {
                    return {status:'pass', message: 'sucess deleting the blog'}
               }else {
                    return {status: 'fail', message: 'error deleting the blog'}
               }
          }catch(error) {
               console.log(error);
               return {status: "fail", message: "error deleting blog"}
          }
     }
}