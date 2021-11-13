const Post        = require('../models/post-model')


class PostService {
    getAllPosts(req, res, next) {
        try {
            Post.find({}, (err, docs) => {
            let allPosts = []
            docs.reverse()

            for(let i = 0; i < docs.length && i<9; i++ ) {
              allPosts.push(docs[i])
            }

            allPosts
            res.json({posts: allPosts})
          })
        
          } catch (err) {
            console.log(err)
            res.json(
              { message: "err" }
              )
          }
    }

    async createPost(req, res, next) {
        const { img, title, mainText } = req.body
        const candidate = await Post.findOne({ img, title, mainText })
      
        if (!candidate) {
          const post = new Post({ img, title, mainText })
          post.save()
      
        } else {
          res.json([
            {message: "halo"},
          ])
        }
    }
}

module.exports = new PostService()