const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

// define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')

const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars negine and views location 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));

// setup path to partial path of handlebars

hbs.registerPartials(partialsPath)

// Setup static folder to serve 
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        name : 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me', 
        name : 'Alex Maunonen'
    }
    )
})
app.get('/help', (req, res) => {
    res.render('help' , {
        title : 'Help Page', 
        message : 'Hello from help message ', 
        name : 'Alexander'
    })
})

app.get('/weather', (req, res) =>{
    res.send({
        forecast : 21, 
        location : 'Moscow'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404', 
        name : 'Alexander',
        error : 'Article for HELP was not found'
    })
})

// page route for 404 
app.get('*', (req, res) => {
    res.render('404', {
        title : '404', 
        name : 'Alexander',
        error : 'Page was not found'
    })
})


app.listen(3000, () => {
    console.log('Listen on port 3000')
})