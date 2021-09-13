require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const User = db.rest.models.User
const Customer = db.rest.models.Customer
const AccessToken = db.rest.models.AccessToken
const bcrypt = require('bcrypt')
const { QueryTypes } = require('sequelize')
const jwt = require('jsonwebtoken')
var fs = require('fs');
var request = require('request')

module.exports = {
    home: (req, res) => {
        res.json({statusCode: 200, data: "This serves as a repository of APIs for Farm Smart Application" })
    },
    register: async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt)

        try {

            const result = db.rest.transaction(async (t) => {
                
                const user = await User.create({
                    email: req.body.email,
                    phone: req.body.phone,
                    password,
                    user_category: req.body.user_category,
                }, { transaction: t });

                await Customer.create({
                    user_id: user.id,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                }, { transaction: t });

            });

            if(result) return res.json({statusCode: 201, error: false,  data: {message: 'User has been registered successfully'}})

            res.json({statusCode: 401, error: true,  data: {message: 'Unable to register customer at the moment. Please ensure all fields are properly filled.'}})

        } catch (error) {
            res.json({statusCode: 400, error: true, data: {message: error}})

        }
    },
    login: async (req, res) => {

        User.findOne({ 
            where: { 
                [Op.or]: [
                    { email: req.body.username }, 
                    { phone: req.body.username }] },
                    attributes: ['id', 'email', 'password'] ,
        }).then(result => {
            if(!result){
                return res.json({ statusCode: 401, error: true, data: { message: 'Unable to retrieve such record or it does not exist.' }})
            }

            bcrypt.compare(req.body.password, result.password, (er, resp) => {
                if (er || resp === false) {
                    return res.json({ statusCode: 401, error: true, data: {message: 'You have provided an incorrect email/mobile no or password'} })
                }else {

                    /**
                     * Create a JWT for the logged in user 
                     * and update the access token table
                     * expiresIn means token will expire in 1 day
                     * The expiry day can be modified
                     */

                     const token = jwt.sign({ user: result.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
                     const refreshToken = jwt.sign({ user: result.id }, process.env.ACCESS_REFRESH_TOKEN)
 
                     AccessToken.findOne({ where: { user_id: result.id } })
                        .then(d => {
                            if(d){
                                let updateValues = {access_token: token, refresh_token: refreshToken}

                                AccessToken.update(updateValues, {
                                    where: { user_id: result.id}
                                }).then(upd => {
                                    return res.json({ statusCode: 201, error: false, data: { accessToken: token, refreshToken: refreshToken } })
                                }).catch(er => {
                                    return res.json({ statusCode: 500, error: true, data: {message: 'We could not process this request. Please try again'} })
                                })
                            }else{

                                //Insert into AccessToken table
                                const tokenData = {
                                    user_id: result.id,
                                    access_token: token,
                                    refresh_token: refreshToken
                                }

                                AccessToken.create(tokenData).then(result => {
                                    return res.json({ statusCode: 201, error: false, data: { accessToken: token, refreshToken: refreshToken } })
                                }).catch(err => {
                                    return res.json({
                                        statusCode: 500,
                                        error: true,
                                        data: {message: 'We are unable to complete this request at the moment. Please try again'}
                                    })
                                })
                            }
                        }).catch(err => {
                            return res.json({
                                statusCode: 500,
                                error: true,
                                data: {message: 'We are unable to complete this request at the moment. Please try again'}
                            })
                        })            

                }
            })
            
        }).catch(err => {
            res.json({ statusCode: 500, error: true, data: {message: err} });
        })
        
    },
}