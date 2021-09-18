require('dotenv').config()

const router = require('express').Router()
const weatherdata = require('../controllers/weatherdata.controller')


router.get('/weather-data/import', weatherdata.import)

router.get('/weather-data', weatherdata.fetchAll)


module.exports = router
