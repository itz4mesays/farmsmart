require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const GeoFarms = db.rest.models.GeoFarms
const Preferences = db.rest.models.Preferences
const { QueryTypes } = require('sequelize')
const { getPagination, getPagingData } = require('../../helpers/utils');
const { parse } = require('dotenv');


module.exports = {
    saveGeo: async (req, res) => {
        let id = await res.locals.id

        GeoFarms.create({
            user_id: id,
            geolocation: req.body.geolocation,
            shape: req.body.shape,
            area: req.body.area,
            crop_name: req.body.crop_name,
            variety: req.body.variety,
            sowing_date: req.body.sowing_date,
            soil_type: req.body.soil_type,
            village_name: req.body.village_name,
            district: req.body.district,
            state: req.body.state,
            country: req.body.country,
        })
        .then(result => {
            res.json({statusCode: 201, error: false,  data: {message: 'Customer GeoFarms has been saved successfully'}})
        })
        .catch(err => {
            res.json({
                statusCode: 500,
                error: true,
                data: {message: 'We are unable to complete this request at the moment. Please try again'}
            })
        })
    },
    listGeoData: async (req, res) => {
        let id = await res.locals.id

        try{

            GeoFarms.findAndCountAll({
                attributes: ['id', 'geolocation', 'shape', 'area', 'crop_name', 'variety', 'sowing_date', 'soil_type', 'village_name', 'district', 'state', 'country'],
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