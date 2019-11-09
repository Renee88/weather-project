const express = require('express')
const router = express.Router()
const apiKey = "369756fcf0f7ba8e9e0e693bc2c5e3f1"
const request = require('request')
const parseString = require('xml2js').parseString
const City = require('../models/City')



router.get('/city/:cityName', function (req, res) {
    let city = req.params.cityName || ""
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`, function (err, response) {
        let weatherInCity = JSON.parse(response.body)
        let name = weatherInCity.name || weatherInCity.message
        if (name === weatherInCity.message) {
            console.log(name)
            return res.send({
                name: name,
                city_id: weatherInCity.cod
            })
        }

        let condition = weatherInCity.weather[0].main
        let tempCelsius = weatherInCity.main.temp
        let icon = weatherInCity.weather[0].icon
        let id = weatherInCity.id

        const chosenCity = new City({
            city_id: id,
            name: name,
            temperature: tempCelsius,
            condition: condition,
            conditionPic: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            favourite: false
        })

        console.log(chosenCity)
        res.send(chosenCity)
    })

})

router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.get('/city', function(req,res){
    res.end()
})

router.post('/city', function (req, res) {
    let cityId = req.body.city_id
    City.find({ city_id: cityId }, function (err, city) {
        if (city.length === 1) {
            return
        } else {

            let city_id = cityId
            let name = req.body.name
            let condition = req.body.condition
            let tempCelsius = req.body.temperature
            let icon = req.body.conditionPic
            let favourite = req.body.favourite

            let newCity = new City({
                city_id: city_id,
                name: name,
                temperature: tempCelsius,
                condition: condition,
                conditionPic: icon,
                favourite: favourite
            })

            newCity.save(function () {
                res.end()
            })
        }
    })

})

router.delete('/city/:cityId', function (req, res) {
    let cityId = req.params.cityId
    City.deleteOne({ city_id: cityId }, function (err, city) {
        console.log(city)
        res.end()
    })
})

router.put('/city', function (req, res) {
    let cityId = req.body.city_id
    request(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&APPID=${apiKey}`, function (err, response) {
        let weatherInCity = JSON.parse(response.body)

        let city_id = cityId
        let condition = weatherInCity.weather[0].description
        let tempCelsius = weatherInCity.main.temp
        let icon = weatherInCity.weather[0].icon
        let conditionPic = `http://openweathermap.org/img/wn/${icon}@2x.png`
        
        
            City.findOneAndUpdate({city_id: city_id },{condition: condition, temperature: tempCelsius, conditionPic: conditionPic},{useFindAndModify: false, new: true}, function (err,city) {
                    console.log(city)
                    res.send(city)
            })
    })
})


module.exports = router 