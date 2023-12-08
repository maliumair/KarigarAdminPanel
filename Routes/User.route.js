const express = require('express')
const router = express.Router()
const {createNewUser, getUserById, getAllUsers} = require('../Controllers/User.controller')

router.route('/')
.get(getAllUsers)
.post(createNewUser)

router.get('/:id', getUserById)

module.exports = router