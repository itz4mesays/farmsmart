//This file would be used as a file that contains general information
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../app/models')
const AccessToken = db.rest.models.AccessToken
const { QueryTypes } = require('sequelize')

let token = null;
module.exports = {
    verifyToken: (req, res, next) => {
        
        if(req.headers.hasOwnProperty('bearer') == true){ //this is for swaggerIO testing
            token = req.headers.bearer
        }else{
            if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
                return res.json({statusCode: 400, error: true, data: {message: 'Missing Bearer token in the header'}})
            }

            token = req.headers.authorization.split(' ')[1].replace("'", '')
        }
        
        if (!token) return res.json({statusCode: 401, error: true, data: {message: 'You do not have the right privilege to view this endpoint'} })

        AccessToken.findOne({ where: { access_token: token }, raw: true, }).then(output => {
            if (output.id !=  "") {
                const available = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                req.user = available
                next()
            } else {
                return res.json({ statusCode: 900, error: true, data: {message: 'No access token found or has expired.'} })
            }
        }).catch(err => {
            return res.json({ statusCode: 400, error: true, data: {message: 'Invalid or no authorization token provided.'} })
        })
    },
    decodedToken: (req, res, next) => {

        if(req.headers.hasOwnProperty('bearer') == true){ //this is for swaggerIO testing
            token = req.headers.bearer
        }else{
            if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
                return res.json({statusCode: 400, error: true, data: {message: 'Missing Bearer token in the header'}})
            }

            token = req.headers.authorization.split(' ')[1].replace("'", '')
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) return res.json({ statusCode: 400, error: true, data: {message: 'Invalid or no authorization token provided.'} })    
            res.locals.id = decoded.user
            next()
        });
    },
    getPagingData: (data, page, limit) => {
        const { count: totalItems, rows: result } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return { totalItems, result, totalPages, currentPage };
    },
    getPagination: (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;

        return { limit, offset };

    }
}