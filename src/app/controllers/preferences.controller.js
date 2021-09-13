require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const Preferences = db.rest.models.Preferences
const { QueryTypes } = require('sequelize')
const { getPagination, getPagingData } = require('../../helpers/utils');
const { parse } = require('dotenv');


module.exports = {
    savePreferences: async (req, res) => {
        let id = await res.locals.id

        Preferences.create({
            user_id: id,
            village_name: req.body.village_name,
            district: req.body.district,
            state: req.body.state,
            country: req.body.country,
            closest_market: req.body.closest_market,
            crop_name: req.body.crop_name,
        })
        .then(result => {
            res.json({statusCode: 201, error: false,  data: {message: 'Customer Preference has been saved successfully'}})
        })
        .catch(err => {
            res.json({
                statusCode: 500,
                error: true,
                data: {message: err.message || 'We are unable to complete this request at the moment. Please try again'}
            })
        })
    },
    listPreferences: async (req, res) => {
        let id = await res.locals.id

        try{

            Preferences.findAndCountAll({
                attributes: ['id', 'village_name', 'district', 'state', 'country', 'closest_market', 'crop_name'],
                where: {user_id: id}, 
                order: [
                  ['id', 'DESC']
                ]
              })
              .then(data => {                
                res.json({statusCode: 200, error: false, data: data })
              });  
          }catch(err) {
            res.json({
                statusCode: 500,
                error: true,
                data: {message:  err.message || "An error occurred while retrieving data."}
            })
          } 
    }
}