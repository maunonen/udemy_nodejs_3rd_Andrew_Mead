
const request = require('request')
require('dotenv').config()
const TOKENMAPBOX = process.env.TOKENMAPBOX

const geocode = (address, callback) => {    
    debugger
    const urlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" 
                     + address 
                     + ".json?access_token=" 
                     + TOKENMAPBOX
                     + "&limit=1"
                     
    request({
            url : urlMapBox, 
            json : true
    }, (error, {body})=> {
        
        if (error){
            callback('Unable to connect ot location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search. ', undefined)
        } else {
            const { 
                    features : [{center : [longitude, latitude]}],
                    features : [{place_name : location}]
                    } = body

            callback(undefined, {
                latitude , 
                longitude , 
                location
           })
        }
    })
}

module.exports = geocode