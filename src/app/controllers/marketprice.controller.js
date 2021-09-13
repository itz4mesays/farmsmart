require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const MarketPrice = db.rest.models.MarketPrice
const { QueryTypes } = require('sequelize')
const { getPagination, getPagingData } = require('../../helpers/utils');
var fs = require('fs');


module.exports = {
    import: async (req, res) => {

        //Check if file exist
        if (fs.existsSync('./MarketData_CurrentData.json')) {
            // path exists
            const data = require('../../../MarketData_CurrentData.json')
            
            fs.stat('./MarketData_CurrentData.json', function (err, stats) {
                // console.log(stats);//here we got all information of file in stats variable
            
                if (err) {
                    return res.json({statusCode: 404, error: true, data: err})
                }
        
                const transformed = Object.values(Object.entries(data)
                .reduce((acc, [ key, value ]) => {
                    Object.values(value).forEach((data, i) => {
                    if (!acc[i]) acc[i] = { };
                    acc[i][key] = data;
                    });
                    return acc;
                }, {  }));
        
                //Save MarketData
                transformed.forEach((value, index, self) => {
                    MarketPrice.create({
                        market_name : value.Market_Name,
                        district_name : value.District_Name,
                        state : value.State,
                        commodity : value.Commodity,
                        variety : value.Variety,
                        price : value.Price,
                        datetimes : value.datetimes
                    })
                })
                
                //Delete the file after import is complete
                fs.unlink('./MarketData_CurrentData.json',function(err){
                     if(err) return res.json({statusCode: 404, error: true, data: err})
                     return res.json({statusCode: 200, error: false, data: 'MarketData_CurrentData.json has been deleted'})
                });  
             }); 
          }else {
            console.log("MarketData_CurrentData.json Does not exist:", 'Not found');
          }
    },
    fetchAll: async (req, res) => {
        
        try{
            MarketPrice.findAndCountAll({
                attributes: ['id', 'market_name', 'district_name', 'commodity', 'variety', 'datetimes', 'price', 'state'],
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