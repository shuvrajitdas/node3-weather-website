const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=216190a027b1f9679e617b5a172ad5c1&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({ url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to weather service!!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current)
            callback(undefined, {
                temperature: body.current.temperature,
                feels_like: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })

}

module.exports = forecast