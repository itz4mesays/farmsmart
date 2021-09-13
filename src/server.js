require('dotenv').config()

const express = require('express')
const helmet= require('helmet')
const fs= require('fs')
const path= require('path')

const app = express()
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors')
const { importMarketData } = require('./helpers/cron')

// importMarketData() //run the cron script

app.use(bodyParser.json())

// const corsOption = {
//     origin: 'localhost:5000',
//     optionsSuccessStatus: 200
// }
app.use(cors())
app.use(helmet())

//Define Swagger Middleware
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'FarmSmart',
            version: 'v1',
            description: 'APIs Documentation for Farm Smart App',
            contact: {
                name: 'Oyedele Olufemi',
                emal: 'oyedele.phemy@gmail.com'
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'Authorization',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        schemes: ['http', 'https'],
        servers: [
            {
                url: 'http://localhost:4100',
                description: 'Development Server'
            }
        ]
    },
    apis: [`${__dirname}/app/routes/*.js`]
};

const swaggerSpecification = swaggerJsDoc(options);

app.use('/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification, { explorer: true }))

let PORT = process.env.ACCESS_PORT || process.env.ACCESS_TEST_PORT

//Define Routes here
const siteRoute = require('./app/routes/site.route')
const userRoute = require('./app/routes/user.route')
const marketpriceRoute = require('./app/routes/marketprice.route')

app.use('/v1', siteRoute)
app.use('/v1/user', userRoute)
app.use('/v1', marketpriceRoute)

app.get('*', (req, res) => {
    res.status(400).json({ message: 'Sorry, We could not process your request at the moment.' });
})

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Farm Smart App has started on port ${PORT}`)
})

module.exports = app;