require('dotenv').config()

const router = require('express').Router()
const site = require('../controllers/site.controller')

router.get('/', site.home)

module.exports = router