const CronJob = require('cron').CronJob;
const request = require('request')

//Running a script that imports marketprice from a specified folder every stipulated period
const importMarketData = () => {
    new CronJob('5 * * * * *', function() {
        request(process.env.APP_TEST_URL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }else{
                console.log(body)
            }
        })
    }, null, true, "America/Chicago");
}

module.exports = {
    importMarketData
}