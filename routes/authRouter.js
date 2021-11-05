const Router = require('express').Router
const User = require('../models/User')
const Post = require('../models/post-model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = new Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password })
  if (!user) {
    return res.json([{ 'message': 'No such user' }])
  }

  if (user) {
    const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, { expiresIn: '22s' })
    res.json([{
      'token': accessToken,
      'userId': user?.id,
    }])
  } else {
    res.json([{
      'message': 'error'
    }])
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  const condidate = await User.findOne({ email, password })
  if (condidate) {
    return res.json([{ 'message': 'Login alredy used' }])
  }
  const user = new User({ email: email, password: password })
  user.save()
  const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })
  if (user) {
    res.json([{
      'token': accessToken,
      'userId': user?.id,
    }])
  } else {
    res.json([{
      'message': 'error'
    }])
  }
})
module.exports = router
  // const user = new User({ email: 'email', password: 'hashedPassword' })
  // user.save()