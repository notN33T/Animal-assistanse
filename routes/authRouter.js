const Router =                require('express').Router
const User =                  require('../models/User')
const jwt =                   require('jsonwebtoken')
const UserService =           require('../service/userService')

const router = new Router()

router.post('/login', UserService.login)

router.post('/register', UserService.register)

module.exports = router
