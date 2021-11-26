const Router                = require('express').Router
const UserService           = require('../service/userService')

const router = new Router()

router.post('/login', UserService.login)

router.post('/register', UserService.register)

module.exports = router
