const Post        = require('../models/post-model')


class PostService {
    getOnePost(req, res, next) {
      
      try {
        let title = req.params.postId
        title = title.replace(/'%'/g, ' ')
        title = title.replace('s:', '')
        Post.find({title}, (err, docs) => {
          res.json({postData: docs})
        })

      } catch(e) {
        res.json({message: "Server error"})
      }

    }


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
            res.json({ 
              message: "err" 
            })
          }
    }

    async createPost(req, res, next) {
        const { img, title, mainText } = req.body
        const candidate = await Post.findOne({ img, title, mainText })
      
        if (!candidate) {
          const post = new Post({ img, title, mainText })
          post.save()
      
        } else {
          res.json([{
            message: "Post created"
          }])
        }
    }

    async createComment(req, res, next) {
      
      const {fcomment, title} = req.body
      const condidatesUserName = fcomment.owner
      const condidatesComment = fcomment.text

      const condidate = await Post.findOne({ title,
         'comments':{ $elemMatch:{text: condidatesComment, owner: condidatesUserName}
      }})

      if(condidate) return res.json([{message:"Comment already exist"}])

      Post.findOneAndUpdate(
        {title: title},
        {$push: { comments: { ...fcomment } }}, 
        (err, docs) => {
          err ? console.log(err) : res.json([{
            message:"Comment created"
          }])
        }
        ).clone()
      
    }
}

module.exports = new PostService()