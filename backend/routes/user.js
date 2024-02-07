const express = require('express')

// controller functions
const { loginUser,aloginUser,signupUser,asignupUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)
// advanced signup route
router.post('/asignup', asignupUser)
// advanced login route
router.post('/alogin', aloginUser)

module.exports = router