require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize')
const jwt = require('jsonwebtoken')
var fs = require('fs');
var request = require('request')

module.exports = {
    home: (req, res) => {
        res.json({statusCode: 200, data: "This serves as a repository for server two" })
    },
}