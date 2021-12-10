const express = require('express')
const bcrypt = require('bcryptjs')
const { emailValidator } = require('../helper/auth.service')
const {
    connection
} = require('../helper/conf.js')
const router = express.Router()



module.exports = router