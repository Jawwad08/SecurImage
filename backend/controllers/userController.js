const User = require('../models/userModel')
const AUser = require('../models/advuserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
    const {name,email, password} = req.body
  try {
    const user = await User.signup(name,email, password)
    // create a token
    const token = createToken(user._id)

    res.status(200).json({name,email, token})
    // res.status(200).json({name,email, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const aloginUser = async (req, res) => {
  const {email,password,category1,image1,category2,image2,category3,image3} = req.body

  try {
    const user = await AUser.alogin(email,password,category1,image1,category2,image2,category3,image3)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const asignupUser = async (req, res) => {
  const {email,password,category1,image1,category2,image2,category3,image3} = req.body
try {
  const user = await AUser.asignup(email,password,category1,image1,category2,image2,category3,image3)
  // create a token
  const token = createToken(user._id)

  res.status(200).json({email,password,category1,image1,category2,image2,category3,image3,token})
  // res.status(200).json({name,email, user})
} catch (error) {
  res.status(400).json({error: error.message})
}
}

module.exports = { asignupUser,aloginUser,signupUser, loginUser }