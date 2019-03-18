const https = require('https')
require('dotenv').config()
const TOKENDARKSKY = process.env.TOKENDARKSKY

const url = 'https://api.darksky.net/forecast/' + TOKENDARKSKY + '/40,75?units=si&lang=fi'

const request = https.request(url, (response) => {
   
    let data = ''
    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(chunk)
    })

    response.on('end', ()=> {
        console.log(JSON.parse(data))
    })

})

request.on('error', (error) => {
    console.log('An error' , error )
})
request.end()