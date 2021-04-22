const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoiZGlwZXNoc3Rhcmt4eHgiLCJhIjoiY2tucTNjODYwMXUzZjJxbnh1bjBjZ2U4MSJ9.ZPfQgGVUDxPZwWAVnDtI8w&limit=1"

    request({ url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect server...',undefined) //onsole.log('Unable to connect server...')
        } else if(body.features.length === 0){
            callback('Invalid input',undefined)//console.log('Invalid input')
        }
        else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }) //console.log("The longitude is "+ response.body.features[0].center[0]+ " and lattitude is  "+response.body.features[0].center[1])   
        }
    })
}





module.exports = geocode