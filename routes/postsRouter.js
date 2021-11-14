const Router      = require('express').Router
const Post        = require('../models/post-model')
const PostService = require('../service/postService')
const upload      = require('../service/uploadService')

const postRouter  = new Router()

postRouter.get('/posts', PostService.getAllPosts)

postRouter.get('/post:postId', PostService.getOnePost)

postRouter.post('/createPost', PostService.createPost)

postRouter.post('/uploadimage', upload, (req, res) => {
    req.file ? res.json([{ message: "success" }]): res.json([{ message: "error" }])
})

module.exports = postRouter
