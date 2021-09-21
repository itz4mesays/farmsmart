require('dotenv').config()
const db = require('../models')
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize')
const WeatherData = db.rest.models.WeatherData

var fs = require('fs');


module.exports = {
    import: async (req, res) => {

        if (fs.existsSync('./Weather_Data.json')) {
            // path exists
            const data = require('../../../Weather_Data.json')
            
            fs.stat('./Weather_Data.json', function (err, stats) {
                console.log(stats);//here we got all information of file in stats variable
            
                if (err) {
                    return res.json({statusCode: 404, error: true, data: err})
                }
        
                //Save MarketData
                data.forEach((value, index, self) => {
                    WeatherData.create({
                        lat: value.lat,
                        lon: value.lon,
                        doy: value.doy,
                        hour: value.hour,
                        elevation: value.elevation,
                        Tair: value.Tair,
                        Precipitation: value.Precipitation,
                        WindSpeed: value.WindSpeed,
                        Rs: value.Rs,
                        SPH: value.SPH,
                        Potential_ET: value.Potential_ET,
                        etr: value.etr,
                        Downward_LW_Rad: value.Downward_LW_Rad,
                        Downward_SW_Rad: value.Downward_SW_Rad,
                        Geopotential_height_surface: value.Geopotential_height_surface,
                        Latent_heat_flux: value.Latent_heat_flux,
                        Max_SPH: value.Max_SPH,
                        Max_temp: value.Max_temp,
                        Min_SPH: value.Min_SPH,
                        Min_temp: value.Min_temp,
                        Pressure_surface: value.Pressure_surface,
                        Sensible_heat_flux: value.Sensible_heat_flux,
                        Specific_humidity: value.Specific_humidity,
                        Temp_2m: value.Temp_2m,
                        Upward_LW_Rad: value.Upward_LW_Rad,
                        Upward_SW_Rad: value.Upward_SW_Rad,
                        SM_150_cm: value.SM_150_cm,
                        SM_25_cm: value.SM_25_cm,
                        SM_5_cm: value.SM_5_cm,
                        SM_70_cm: value.SM_70_cm,
                        Wind_U: value.Wind_U,
                        Wind_V: value.Wind_V 
                    })
                })

                //Delete the file after import is complete
                fs.unlink('./Weather_Data.json',function(err){
                    if(err) return res.json({statusCode: 404, error: true, data: err})
                    return res.json({statusCode: 200, error: false, data: 'Weather_Data.json has been imported and deleted'})
               }); 

             }); 
          }else {
            console.log("Weather_Data.json Does not exist:", 'Not found');
          }
    },
    fetchAll: async (req, res) => {      
        try{
            WeatherData.findAndCountAll({
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