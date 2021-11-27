const Post                  = require('../models/post-model')
const User                  = require('../models/User')
const rename                = require('../service/renameService')
class ChangeUsersData {
    changeAvatar(req, res, next) {
        const { userName } = req.body

        Post.updateMany(
            { 'comments.owner': userName },
            { $set: { 'comments.$[x].avatar': userName + '.jpg'} },
            { arrayFilters: [{'x.owner': userName}]}, 
            ( err, docs ) => {
                err ? console.log(err) : null
            })
        
        User.findOneAndUpdate({userName: userName}, {avatar: userName + '.jpg'},
            (err, data) => {
                err ? console.log(err) : null
            }).clone()
            
        return next()

    }
    changeUserName(req, res, next) {
        const { userName, newUserName } = req.body
        rename(req)

        Post.updateMany(
            { 'comments.owner': userName },
            {$set: { 'comments.$[x].owner': newUserName } },
            {arrayFilters: [{'x.owner': userName}]}, 
            (err, docs) => {
                err ? console.log(err) : console.log(docs)
            })

        Post.updateMany(
            { 'comments.owner': userName },
            {$set: { 'comments.$[x].avatar': newUserName + '.jpg' } },
            {arrayFilters: [{'x.owner': userName}]}, 
            (err, docs) => {
                err ? console.log(err) : null
            }).clone()
        
        User.findOneAndUpdate({userName: userName}, {userName: newUserName},
            (err, data) => {
                err ? console.log(err) : null
            }).clone()

        User.findOneAndUpdate({avatar: userName + '.jpg'}, {avatar: newUserName + '.jpg'},
            (err, data) => {
                err ? console.log(err) : res.json([{message: 'success', status: 'success'}])
            }).clone()
        
        
    }
}

module.exports = new ChangeUsersData()