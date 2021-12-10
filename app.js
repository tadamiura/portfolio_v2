require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./src/routes/index')

app.use(cors())

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

// Handler user's role and infos
app.use('/api/users', routes.Users)

// Register a new user
app.use('/api/register', routes.Register)

// Authentification for user of back-office
app.use('/api/auth', routes.Authentification),

module.exports = app;
