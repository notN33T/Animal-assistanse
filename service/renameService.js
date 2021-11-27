const fs = require('fs');

function rename(req) {
    try{
        if (req.file.originalname) {
            fs.rename(`./client/public/avatars/` + req.file.originalname, 
            `./client/public/avatars/` + req.body.userName + '.jpg',
            (err) => {})
        }
    } catch(e) {
        fs.rename(`./client/public/avatars/` + req.body.userName + '.jpg', 
        `./client/public/avatars/` + req.body.newUserName + '.jpg',
        (err) => {})
    }
    
}

module.exports = rename