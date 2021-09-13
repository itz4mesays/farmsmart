require('dotenv').config()

const router = require('express').Router()
const marketprice = require('../controllers/marketprice.controller')

/**
 *  @swagger
 *  components:
 *      schemas:
 *          MarketPrice:
 *              type: object
 *              required: 
 *                  -   market_name
 *                  -   district_name
 *                  -   commodity
 *                  -   variety
 *                  -   datetimes
 *                  -   price
 *                  -   state
 *              properties:
 *                  market_name:
 *                      type: string
 *                      description: Market Name
 *                  district_name:
 *                      type: string
 *                      description: Name of District
 *                  commodity:
 *                      type: string
 *                      description: Commodity
 *                  variery:
 *                      type: string
 *                      description: Variety 
 *                  datetimes:
 *                      type: string
 *                      description: e.g Datetimes
 *                  price:
 *                      type: string
 *                      description: Price
 *                  state:
 *                      type: string
 *                      description: State
 */

router.get('/marketprice/import', marketprice.import)

/**
 * @swagger
 *  /v1/marketprices:
 *      get:
 *          summary: Fetch the paginated result of all market data
 *          tags: [MarketPrice]
 *          parameters:
 *              -   in: query
 *                  name: page
 *                  type: integer
 *                  required: true
 *                  description: Page Number
 *              -   in: query
 *                  name: limit
 *                  type: integer
 *                  required: true
 *                  description: Limit (Size of the returned data)
 *          responses:
 *              200:
 *                  description: Show paginated result and its information
 *              500:
 *                  description: Unable to process request or an error occured
 */
router.get('/marketprices', marketprice.fetchAll)

module.exports = router