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
            res.json({statusCode: 201, error: false,  data: {message: 'Customer GeoFarms have been saved successfully'}})
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

        if(req.query.page == null || req.query.limit == null) return res.json({statusCode: 402, error: true, data: { message: 'Missing page or size parameter'} })

        try{
            const { page, size } = req.query;
            const { limit, offset } = getPagination(page, size);
          
            GeoFarms.findAndCountAll({
                attributes: ['id', 'geolocation', 'shape', 'area', 'crop_name', 'variety', 'sowing_date', 'soil_type', 'village_name', 'district', 'state', 'country'],
                where: {user_id: id}, 
                order: [
                  ['id', 'DESC']
                ],
                limit: limit, 
                offset: offset 
              })
              .then(data => {
                const response = getPagingData(data, page, limit);
                
                res.json({statusCode: 200, error: false, response})
              });  
          }catch(err) {
            res.json({
                statusCode: 500,
                error: true,
                data: {message:  err.message || "An error occurred while retrieving data."}
            })
          } 
    },
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
            res.json({statusCode: 201, error: false,  data: {message: 'Customer Preferences have been saved successfully'}})
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

        if(req.query.page == null || req.query.limit == null) return res.json({statusCode: 402, error: true, data: { message: 'Missing page or size parameter'} })

        try{
            const { page, size } = req.query;
            const { limit, offset } = getPagination(page, size);
          
            Preferences.findAndCountAll({
                attributes: ['id', 'village_name', 'district', 'state', 'country', 'closest_market', 'crop_name'],
                where: {user_id: id}, 
                order: [
                  ['id', 'DESC']
                ],
                limit: limit, 
                offset: offset 
              })
              .then(data => {
                const response = getPagingData(data, page, limit);
                
                res.json({statusCode: 200, error: false, response})
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