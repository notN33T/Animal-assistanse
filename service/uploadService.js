const multer      = require('multer')

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './client/public/posts-images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage })

module.exports = upload.single('img')