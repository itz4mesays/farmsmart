require('dotenv').config()

const router = require('express').Router()
const site = require('../controllers/site.controller')
const { signupValidation, loginValidation, validate} = require('../../helpers/validator')


router.get('/', site.home)

module.exports = router