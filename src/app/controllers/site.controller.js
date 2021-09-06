require('dotenv').config()
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')
const axios = require('axios')
const { QueryTypes } = require('sequelize')
const jwt = require('jsonwebtoken')

module.exports = {
    home: (req, res) => {
        let p = "This serves as a repository of APIs for Farm Smart Application"
        res.json({ message: p, statusCode: 200 })
    },
}