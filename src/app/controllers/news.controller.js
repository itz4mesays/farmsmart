require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const News = db.rest.models.News
const { QueryTypes } = require('sequelize')
const { getPagination, getPagingData } = require('../../helpers/utils');
const { parse } = require('dotenv');


module.exports = {
    create: async (req, res) => {
        let id = await res.locals.id

        News.create({
            user_id: id,
            content_summary: req.body.content_summary,
            image_id: req.body.image_id,
            url: req.body.url,
            likes: req.body.likes,
            views: req.body.views,
            language: req.body.language,
        })
        .then(result => {
            res.json({statusCode: 201, error: false,  data: {message: 'Customer News has been saved successfully'}})
        })
        .catch(err => {
            res.json({
                statusCode: 500,
                error: true,
                data: {message: err.message || 'We are unable to complete this request at the moment. Please try again'}
            })
        })
    },
    listNews: async (req, res) => {
        let id = await res.locals.id

        try{

            News.findAndCountAll({
                attributes: ['id', 'content_summary', 'image_id', 'url', 'likes', 'views', 'language'],
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