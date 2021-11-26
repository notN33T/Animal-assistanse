const Post                  = require('../models/post-model')
const User                  = require('../models/User')

class ChangeUsersData {
    changeAvatar(req, res, next) {
        const { userName } = req.body

        Post.updateMany(
            { 'comments.owner': userName },
            { $set: { 'comments.$.avatar': userName + '.jpg'} },
            { arrayFilters: [{'comments.$.owner': userName}]}, 
            ( err, docs ) => {
            }
            ).clone()
        
        User.findOneAndUpdate({userName: userName}, {avatar: userName + '.jpg'},
            (error, data) => {
                error ? console.log(error) : null
            }).clone()
            
        return next()

    }
    changeUserName(req, res, next) {
        const { userName, newUserName } = req.body
        Post.updateMany(
            { 'comments.owner': userName },
            {$set: { 'comments.$.owner': newUserName } },
            {arrayFilters: [{'comments.$.owner': userName}]}, 
            (err, docs) => {
            }
            ).clone()
            res.json([{message: 'success', status: 'success'}])
        
        User.findOneAndUpdate({userName: userName}, {userName: newUserName},
            (err, data) => {
                err ? console.log(err) : null
            }).clone()
        }
}

module.exports = new ChangeUsersData()