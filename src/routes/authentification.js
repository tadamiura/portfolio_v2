const express = require('express')
const { connection } = require('../helper/conf')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../helper/service.js')
const { emailValidator } = require('../helper/auth.service')
const router = express.Router()

const checkUser = (req, res, next) => {
    const { email, password } = req.body

    connection.query('SELECT * FROM user_of_bo WHERE email = ?', email, (err, result) => {
        if (err) {
            return res.status(500).send(`${err}`)
        } else if(!result[0]) {
            return res.status(409).send('Unknown user')
        }

        const passwordIsValid = bcrypt.compareSync(
            password, result[0].password
          )
        if (!passwordIsValid) {
            return res.status(401).send({ 
                auth: false, 
                jwtToken: null,
                user: null
         })
        }
        req.user = result[0]
        next()
    })
}

const createToken = (req, res, next) => {
    const tokenUserInfo = {
        id: req.user.id,
        lastname: req.user.lastname,
        email: req.user.email,
        firstname: req.user.firstname,
        role: req.user.role,
        gender: req.user.gender
      }

    const token = jwt.sign(
        tokenUserInfo,
        secret,
        { expiresIn: '24h' },
        { algorithm: 'RS256' }
    )

		res.header('Access-Control-Expose-Headers', 'x-access-token')
		res.set('x-access-token', token)
        res.status(200).send({ 
            auth: true,
            jwtToken: token,
            user: tokenUserInfo
         })
}

router.post('/', emailValidator, checkUser, createToken)

module.exports = router
