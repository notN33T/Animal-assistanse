const Router      = require('express').Router
const Post        = require('../models/post-model')
const PostService = require('../service/postService')
const postRouter  = new Router()

postRouter.get('/posts', PostService.getAllPosts)

postRouter.post('/createPost', PostService.createPost)

module.exports = postRouter
