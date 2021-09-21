const { check, body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const db = require('../app/models')
const User = db.rest.models.User
const Customer = db.rest.models.Customer

const signupValidation = () => {
    return [
        body('firstname')
            .not().isEmpty().trim().withMessage('Firstname field is required'),
        body('lastname')
            .not().isEmpty().trim().withMessage('Lastname field is required'),
        body('user_category')
            .not().isEmpty().trim().withMessage('User Category field is required'),
        body('phone')
            .not().isEmpty().trim().withMessage('Phone Number field is required')
            .custom((value, { req }) => {
                return User.findOne({ where: { phone: req.body.phone } }).then(user => {
                    if (user) {
                        return Promise.reject('Phone Number already in use. Please try another one');
                    }
                });
            }),
        body('email')
            .isEmail().withMessage('Email address field is not a valid one.')
            .custom((value, { req }) => {
                return User.findOne({ where: { email: req.body.email } }).then(user => {
                    if (user) {
                        return Promise.reject('E-mail address already in use. Please try another one');
                    }
                });
            }).not().isEmpty().withMessage('Email address field is required'),
        body('password')
            .not().isEmpty().trim().withMessage('Password field is required')
            .isLength({min: 6}).withMessage('Password can only contain minimum of six characters'),
        body('confirm_password').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
        
            return true;
            }),

    ]
}

const loginValidation = () => {
    return [
        body('username')
            .not().isEmpty().trim().withMessage('Email or Mobile Phone field is required'),
        body('password')
            .not().isEmpty().trim().withMessage('Password field is required')
    ]
}

const geoFarmValidation = () => {
    return [
        body('geolocation')
            .not().isEmpty().trim().withMessage('Geo Location field is required'),
        body('shape')
            .not().isEmpty().trim().withMessage('Shape field is required'),
        body('area')
            .not().isEmpty().trim().withMessage('Area field is required'),
        body('crop_name')
            .not().isEmpty().trim().withMessage('Crop Name field is required'),
        body('variety')
            .not().isEmpty().trim().withMessage('Variety field is required'),
        body('sowing_date')
            .not().isEmpty().trim().withMessage('Sowing Date field is required')
            .isDate().withMessage('Sowing Date must be a valid date e.g YYYY-MM-DD'),
        body('soil_type')
            .not().isEmpty().trim().withMessage('Soil Type field is required'),
        body('village_name')
            .not().isEmpty().trim().withMessage('Village Name field is required'),
        body('district')
            .not().isEmpty().trim().withMessage('District field is required'),
        body('state')
            .not().isEmpty().trim().withMessage('State field is required'),
        body('country')
            .not().isEmpty().trim().withMessage('Country field is required')
    ]
}

const preferenceValidation = () => {
    return [
        body('village_name')
            .not().isEmpty().trim().withMessage('Village Name field is required'),
        body('district')
            .not().isEmpty().trim().withMessage('District field is required'),
        body('state')
            .not().isEmpty().trim().withMessage('State field is required'),
        body('country')
            .not().isEmpty().trim().withMessage('Country field is required'),
        body('closest_market')
            .not().isEmpty().trim().withMessage('Closest Market field is required'),
        body('crop_name')
            .not().isEmpty().trim().withMessage('Crop Name field is required')
    ]
}

const newsValidation = () => {
    return [
        body('content_summary')
            .not().isEmpty().trim().withMessage('Content Summary field is required'),
        body('image_id')
            .not().isEmpty().trim().withMessage('Image Id field is required'),
        body('url')
            .not().isEmpty().trim().withMessage('URL field is required'),
        body('likes')
            .not().isEmpty().trim().withMessage('Likes field is required'),
        body('views')
            .not().isEmpty().trim().withMessage('Views field is required'),
        body('language')
            .not().isEmpty().trim().withMessage('Language field is required')
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ msg: err.msg }))

    res.json({
        statusCode: 402,
        error: true,
        data: extractedErrors
    })
}


module.exports = {
    signupValidation,
    loginValidation,
    geoFarmValidation,
    preferenceValidation,
    newsValidation,
    validate
}