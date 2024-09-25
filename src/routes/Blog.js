const express = require('express');
const BlogRouter = express.Router();
const BlogController = require('../controllers/BlogController');

BlogRouter.get('/', BlogController.get);
BlogRouter.post('/', BlogController.add);
BlogRouter.patch('/', BlogController.update);
BlogRouter.delete('/', BlogController.delete);


module.exports = BlogRouter;