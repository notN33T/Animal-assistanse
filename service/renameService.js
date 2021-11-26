const fs = require('fs');

function rename(req) {
    fs.rename(`./client/public/avatars/` + req.file.originalname, 
        `./client/public/avatars/` + req.body.userName + '.jpg',
        (err) => {})
}

module.exports = rename