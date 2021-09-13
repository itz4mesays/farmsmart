require('dotenv').config()

const router = require('express').Router()
const site = require('../controllers/site.controller')
const { signupValidation, loginValidation, validate} = require('../../helpers/validator')


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
 *                  -   password
 *                  -   confirm_password
 *                  -   user_category
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
 *                  password:
 *                      type: string
 *                      description: secret key
 *                  confirm_password:
 *                      type: string
 *                      description: must match password string
 *                  user_category:
 *                      type: string
 *                      description: e.g Buyer or Farmer
 *              example:
 *                  firstname: John
 *                  lastname: Doe
 *                  phone: 2348000000000
 *                  email: johndoe@gmail.com
 *                  password: helloworld
 *                  confirm_password: helloworld
 *                  user_category: Buyer
 */


router.get('/', site.home)

/**
 * @swagger
 * /v1/account/register:
 *      post:
 *          summary: Signs up a new user
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              201:
 *                  description: User created successfully
 *              400:
 *                  description: Internal error
 *              402:
 *                  description: Validation errors             
 */
router.post('/account/register', signupValidation(), validate, site.register)

/**
 * @swagger
 * /v1/account/login:
 *      post:
 *          summary: Allows user to login
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  description: email or mobile phone
 *                              password:
 *                                  type: string
 *                                  description: secret key used during registration
 *          responses:
 *              201: 
 *                  description: token generated after credentials has been confirmed
 *              401:
 *                  description: Unable to retrieve data or incorrect login credentials
 *              402:
 *                  description: Validation errors
 *              500:
 *                  description: Server related errors
 *                   
 */
router.post('/account/login', loginValidation(), validate, site.login)

module.exports = router