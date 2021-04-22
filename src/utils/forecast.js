const request = require('request')

const forecast = (lattitude,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=370a07027a9b5d094a39f57c1500f83a&query="+lattitude+","+longitude+""

    request( { url, json: true}, (error, { body }) => {

    if (error){
        callback('Unable to connect server...',undefined) //console.log('Unable to connect server...')
    } else if(body.error){
        callback('Invalid input',undefined)
    }
    else {
        callback(undefined,"The temprature at "+body.location.name+" is "+ body.current.temperature+ " and it feels like "+body.current.feelslike+ " and weather condition : "+body.current.weather_descriptions[0])
    }
    

})
}

module.exports = forecast