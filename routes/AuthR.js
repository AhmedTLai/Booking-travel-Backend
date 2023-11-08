const express = require('express')
const rout = express.Router()
const {RegisterC, LoginC} = require('../Controllers/AuthC.js')

rout.post('/register',RegisterC)
rout.post('/login',LoginC)



module.exports = rout