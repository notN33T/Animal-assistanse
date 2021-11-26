const Router            = require('express').Router
const PostService       = require('../service/postService')
const uploadPost        = require('../service/uploadPostService')
const uploadAvatar      = require('../service/uploadAvatarService')
const rename            = require('../service/renameService')
const ChangeUsersData   = require('../service/changeUsersData')

const postRouter  = new Router()

postRouter.get('/posts', PostService.getAllPosts)

postRouter.get('/post:postId', PostService.getOnePost)

postRouter.post('/createPost', PostService.createPost)

postRouter.post('/deletePost', PostService.deletePost)

postRouter.post('/create-comment', PostService.createComment)

postRouter.post('/delete-comment', PostService.deleteComment)

postRouter.post('/edit-comment', PostService.editComment)

postRouter.post('/uploadimage', uploadPost, (req, res) => {
    req.file ? res.json([{ message: 'success', status:'success' }])
    : res.json([{ message: 'Cant upload image', status:'error' }])
})

postRouter.post('/uploadavatar', uploadAvatar, ChangeUsersData.changeAvatar, (req, res) => {
    if (!req.file) return res.json([{ message: 'Cant upload image', status:'error' }])
    rename(req)
    res.json([{ message: 'success', status:'success' }])
})

postRouter.post('/change-user-name', ChangeUsersData.changeUserName)

module.exports = postRouter
