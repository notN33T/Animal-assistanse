const Post        = require('../models/post-model')
const ObjectId    = require('mongodb').ObjectId;

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
        res.json({
          message: 'Server error', status: 'error'
        })
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
            res.json({posts: allPosts})
          })
        
          } catch (err) {
            console.log(err)
            res.json({ 
              message: 'server error', status: 'error' 
            })
          }
    }

    async createPost(req, res, next) {
        const { img, title, mainText } = req.body
        const candidate = await Post.findOne({ img, title, mainText })
      
        if (!candidate) {
          const post = new Post({ img, title, mainText })
          post.save()
          res.json([{
            message: 'Post created', status: 'success'
          }])
      
        } else {
          res.json([{
            message: 'Post alredy created', status: 'error'
          }])
        }
    }

    async deletePost(req, res, next) {
      const id = req.body.postId
      await Post.findOneAndDelete({ '_id': new ObjectId(id) })
      return res.send([{message: 'post deleted', status: 'success'}])
    }

    async createComment(req, res, next) {
      
      const {fcomment, title} = req.body
      const condidatesUserName = fcomment.owner
      const condidatesComment = fcomment.text

      const condidate = await Post.findOne({ title,
         'comments':{ $elemMatch:{text: condidatesComment, owner: condidatesUserName}
      }})

      if(condidate) return res.json([{
        message:'Comment already exist', status: 'error'
      }])

      Post.findOneAndUpdate(
        {title: title},
        {$push: { comments: { ...fcomment } }}, 
        (err, docs) => {
          err ? console.log(err) : res.json([{
            message:'Comment created', status: 'success'
          }])
        }
        ).clone()
      
    }

    async deleteComment(req, res, next) {
      const {id, title} = req.body
      Post.findOneAndUpdate(
        {title: title},
        {$pull: { comments: { '_id': new ObjectId(id) } }}, 
        (err, docs) => {
          err ? console.log(err) : res.json([{
            message:'Comment deleted', status: 'success'
          }])
        }
        ).clone()
    }

    async editComment(req, res, next) {
      const {editedText, text, owner, title} = req.body

      const condidate = await Post.findOne({ title,
        'comments':{ $elemMatch:{text: editedText, owner: owner}
     }})

     if(condidate) return res.json([{
       message:'Comment already exist', status: 'error'
     }])

      Post.findOneAndUpdate(
        { title: title, 'comments.text': text, 'comments.owner': owner },
        {$set: { 'comments.$.text': editedText } },
        {arrayFilters: [{'comments.$.owmer': owner, 'comments.$.text': text}]}, 
        (err, docs) => {
          err ? console.log(err) : res.json([{
            message:'Comment edited', status: 'success'
          }])
        }
        ).clone()
    }
}

module.exports = new PostService()