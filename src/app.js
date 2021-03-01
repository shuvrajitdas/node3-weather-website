const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Shuvrajit Das'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Ask for help',
        title: 'Help',
        name: 'Shuvrajit Das'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shuvrajit Das'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address term '
        })
    }

    /*res.send({
        forecast: '40 degree',
        location: 'Philadelphia',
        address: req.query.address
    })*/

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error: error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term  '
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Shuvrajit Das',
        errorMessage: 'Help Page Not Found!!!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Shuvrajit Das',
        errorMessage: 'Page Not Found!!!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})