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
    const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })

    await User.findOneAndUpdate(
      {token: user.token},
      {token: accessToken},
      (error, data) => {
        error ? console.log(error) : console.log(data)
      }
    ).clone()

    res.json([{
      'token': accessToken,
      'userId': user?.id,
      'isAdmin': user.admin,
    }])
  } else {
    res.json([{
      'message': 'error'
    }])
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body
  const condidate = await User.findOne({ email })
  if (condidate) {
    return res.json([{ 'message': 'Login alredy used' }])
  }
  const user = new User({ email: email, password: password, token: email, admin: false  })
  await user.save()
  const accessToken = jwt.sign({ user }, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })

  await User.findOneAndUpdate(
    {token: user.token},
    {token: accessToken},
    (error, data) => {
      error ? console.log(error) : console.log(data)
    }
  ).clone()


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