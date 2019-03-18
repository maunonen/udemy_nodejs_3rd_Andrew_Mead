const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const location  = process.argv.slice(2).join(' ')


if (!location){
    return console.log('You should provide a location ')
}

geocode(location, (error, {latitude, longitude, location})=> {
    if (error){
        return console.log()
    }     
    forecast(latitude, longitude  , (error, forecastData) => {
        if (error){
            return console.log(error)
        }
        console.log(location)
        console.log(forecastData)
      })
})


/* request({
    url : url, 
    json : true
}, 
(error, responce) => {
    if(error){
        console.log('Unable to connect to weather services') 
    } else if (responce.body.error){
        console.log('Unable to find location')
    }
    else {
        console.log(`${responce.body.daily.data[0].summary} It is currently ${responce.body.currently.temperature} degrees out. There is ${responce.body.currently.precipProbability * 100}% chance of rain.`); 
    }    
})

request({
    url : urlMapBox, 
    json : true 
}, 
(error, responce) => {

    //console.log(responce.body.message); 
    if(error){
        console.log('Unable to connect to MapBox geolocation')
    } else if (responce.body.message){
        console.log('Unable to get location: ' , responce.body.message )
        if (responce.body.features.length === 0){
    }else {
            console.log('Unable to get location ')
        } else {
            const latitude = responce.body.features[0].center[1] 
            const longitude =  responce.body.features[0].center[0]
            console.log(longitude, latitude)
        }
}
}
)    */