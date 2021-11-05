const Router = require('express').Router
const postRouter = new Router()
const Post = require('../models/post-model')

postRouter.get('/posts', (req, res) => {
  try {
    Post.find({}, function (err, docs) {
    console.log(docs)
    res.json({posts: docs})
  })

  } catch (err) {
    console.log(err)
    res.json(
      { message: "err" }
      )
  }
})

postRouter.post('/createPost', async (req, res) => {
  const { img, title, text } = req.body
  console.log(img, title, text)
  const candidate = await Post.findOne({ img, title, text })

  if (!candidate) {
    const post = new Post({ img, title, text })
    post.save()

  } else {
    res.json([
      {message: "halo"},
    ])
  }

})

module.exports = postRouter
