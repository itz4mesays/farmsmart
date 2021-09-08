require('dotenv').config()

const router = require('express').Router()
const user = require('../controllers/user.controller')
const geofarms = require('../controllers/geofarms.controller')
const { verifyToken, decodedToken } = require('../../helpers/utils')
const { geoFarmValidation, preferenceValidation, validate} = require('../../helpers/validator')


/**
 *  @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required: 
 *                  -   firstname
 *                  -   lastname
 *                  -   phone
 *                  -   email
 *                  -   user_category
 *                  -   created_at
 *              properties:
 *                  firstname:
 *                      type: string
 *                      description: firstname
 *                  lastname:
 *                      type: string
 *                      description: lastname
 *                  phone:
 *                      type: string
 *                      description: phone number
 *                  email:
 *                      type: string
 *                      description: email address 
 *                  user_category:
 *                      type: string
 *                      description: e.g Buyer or Farmer
 *                  createdAt:
 *                      type: date
 *                      description: date account was created
 *                  updatedAt:
 *                      type: date
 *                      description: date account was last updated
 */

/**
 * @swagger
 *  /v1/user/refresh-token:
 *      post:
 *          summary: Generates a new access token
 *          tags: [User]
 *          parameters:
 *              -   in: header
 *                  name: Bearer
 *                  type: string
 *                  required: true
 *                  description: Access token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              refresh_token:
 *                                  type: string
 *                                  description: Refresh token generated upon login
 *          responses:
 *              201:
 *                  description: New access token was generated
 *              400:
 *                  description: No user was associated with the passed access token
 *              402:
 *                  description: Missing refresh token value
 *              403:
 *                  description: Forbidden (Unable to verify refresh token that was passed)
 *              500:
 *                  description: Unable to process request
 */
 router.post('/refresh-token', verifyToken, decodedToken, user.refreshToken)

 /**
 * @swagger
 *  /v1/user/get-user-profile/{username}:
 *      get:
 *          summary: Get User Profile Details
 *          tags: [User]
 *          parameters:
 *              -   in: header
 *                  name: Bearer
 *                  type: string
 *                  required: true
 *                  description: Generated token
 *              -   in: path
 *                  name: username
 *                  schema:
 *                      type: string
 *                  required: true
 *                  description: registered email or mobile phone
 *          responses:
 *              200:
 *                  description: Record was found
 *              400:
 *                  description: No user was found
 */
router.get('/get-user-profile/:username', verifyToken, decodedToken, user.getUserProfile)

/**
 * @swagger
 *  /v1/user/add-geodata:
 *      post:
 *          summary: Capture GeoFarms Data for a customer
 *          tags: [User]
 *          parameters:
 *              -   in: header
 *                  name: Bearer
 *                  type: string
 *                  required: true
 *                  description: Access token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              geolocation:
 *                                  type: string
 *                                  description: Geo Location
 *                              shape:
 *                                  type: string
 *                                  description: Shape
 *                              area:
 *                                  type: string
 *                                  description: Area
 *                              crop_name:
 *                                  type: string
 *                                  description: Crop Name
 *                              variety:
 *                                  type: string
 *                                  description: Variety
 *                              sowing_date:
 *                                  type: string
 *                                  description: Sowing Date e.g YYYY-MM-DD
 *                              soil_type:
 *                                  type: string
 *                                  description: Type of soil
 *                              village_name:
 *                                  type: string
 *                                  description: Name of village
 *                              district:
 *                                  type: string
 *                                  description: District
 *                              state:
 *                                  type: string
 *                                  description: State
 *                              country:
 *                                  type: string
 *                                  description: Country
 *          responses:
 *              201:
 *                  description: Data has been saved
 *              500:
 *                  description: Unable to process request
 */
router.post('/add-geodata', verifyToken, decodedToken, geoFarmValidation(), validate, geofarms.saveGeo)

/**
 * @swagger
 *  /v1/user/list-geodata:
 *      get:
 *          summary: Fetch the list of geofarms data for a single customer
 *          tags: [User]
 *          parameters:
 *              -   in: header
 *                  name: Bearer
 *                  type: string
 *                  required: true
 *                  description: Access token
 *              -   in: query
 *                  name: page
 *                  type: integer
 *                  required: true
 *                  description: Page Value
 *              -   in: query
 *                  name: limit
 *                  type: integer
 *                  required: true
 *                  description: Limit value
 *          responses:
 *              200:
 *                  description: Show paginated result and its information
 *              500:
 *                  description: Unable to process request or an error occured
 */
router.get('/list-geodata', verifyToken, decodedToken, geofarms.listGeoData)

/**
 * @swagger
 *  /v1/user/add-preferences:
 *      post:
 *          summary: Capture Preferences Data for a customer
 *          tags: [User]
 *          parameters:
 *              -   in: header
 *                  name: Bearer
 *                  type: string
 *                  required: true
 *                  description: Access token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              village_name:
 *                                  type: string
 *                                  description: Name of village
 *                              district:
 *                                  type: string
 *                                  description: District
 *                              state:
 *                                  type: string
 *                                  description: State
 *                              country:
 *                                  type: string
 *                                  description: Country
 *                              closest_market:
 *                                  type: string
 *                                  description: Closest Market
 *                              crop_name:
 *                                  type: string
 *                                  description: Name of Crop
 *          responses:
 *              201:
 *                  description: Data has been saved
 *              500:
 *                  description: Unable to process request
 */
router.post('/add-preferences', verifyToken, decodedToken, preferenceValidation(), validate, geofarms.savePreferences)

/**
 * @swagger
 *  /v1/user/list-preferences:
 *      get:
 *          summary: Fetch the list of preferences data for a single customer
 *          tags: [User]
 *          parameters:
 *              -   in: header
 *                  name: Bearer
 *                  type: string
 *                  required: true
 *                  description: Access token
 *              -   in: query
 *                  name: page
 *                  type: integer
 *                  required: true
 *                  description: Page Value
 *              -   in: query
 *                  name: limit
 *                  type: integer
 *                  required: true
 *                  description: Limit value
 *          responses:
 *              200:
 *                  description: Show paginated result and its information
 *              500:
 *                  description: Unable to process request or an error occured
 */
 router.get('/list-preferences', verifyToken, decodedToken, geofarms.listPreferences)
 
module.exports = router