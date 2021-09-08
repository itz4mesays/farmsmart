require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const User = db.rest.models.User
const AccessToken = db.rest.models.AccessToken
const { QueryTypes } = require('sequelize')
const jwt = require('jsonwebtoken')

module.exports = {
    getUserProfile: async (req, res) => {
        let id = await res.locals.id

        /**
         * Username was required to double check
         * in case the jwt decoded value isn't enough
         */

        let userInfo = [] //an empty array

        db.rest.query(`SELECT u.phone, u.email, u.user_category, DATE_FORMAT(u.createdAt, "%M %d %Y") as createdAt, c.lastname, c.firstname FROM User u 
                        JOIN Customer c ON u.id = c.user_id WHERE u.email='${req.params.username}' || u.phone='${req.params.username}'`, {
            type: QueryTypes.SELECT
        }).then(output => {

            userInfo.push({
                email: output[0].email,
                phone: output[0].phone,
                user_category: output[0].user_category,
                firstname: output[0].firstname,
                lastname: output[0].lastname,
                date_registered: output[0].createdAt
            })

            res.json({ statusCode: 200, error: false, data: { message: userInfo} })

        }).catch(err => {
            return res.json({
                statusCode: 400,
                error: true,
                data: {message: 'Such user does not exist. Please try again'}
            })
        })
    },
    refreshToken: async (req, res) => {
        if(req.body.refresh_token == null) return res.json({statusCode: 402, error: true, data: { message: 'Missing refresh token value'} })

        AccessToken.findOne({ where: { refresh_token: req.body.refresh_token} , raw: true})
        .then(d => {
            if(d == null) return res.json({ statusCode: 400, error: true, data: { message: "No user is associated with the passed refresh token. " } })


            jwt.verify(req.body.refresh_token, process.env.ACCESS_REFRESH_TOKEN , (err, user) => {
                if (err) return res.json({statusCode: 403, error: true, data: {message: 'Forbidden'}})

                //Create access token
                const accessToken = jwt.sign({ name: user.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

                try {
                    const result = AccessToken.update({access_token: accessToken}, {
                        where: { id: d.id },
                        returning: true
                      });

                      if(!result) return res.json({ statusCode: 500, error: true, data: {message: 'Unable to update the refresh token at the moment'} })

                      return res.json({ statusCode: 201, error: false, data: { access_token: accessToken} })

                } catch (error) {
                    res.json({
                        statusCode: 500,
                        error: true,
                        data: {message: err}
                    })
                }

            });

        }).catch(err => {
            res.json({
                statusCode: 500,
                error: true,
                data: {message: err}
            })
        }) 
    }
}