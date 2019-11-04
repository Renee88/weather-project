const express = require('express')
const router = express.Router()
const apiKey = "369756fcf0f7ba8e9e0e693bc2c5e3f1"
const request = require('request')
const City = require('../models/City')

router.get('/city/:cityName', function (req, res) {
    let city = req.params.cityName
    
    request(`https://api.openweathermap.org/data/2.5/weather?q=${cityForAPI}&units=metric&APPID=${apiKey}`, function (err, response) {

        let weatherInCity = JSON.parse(response.body)
        let name = weatherInCity.name
        let condition = weatherInCity.weather[0].main
        let tempCelsius = weatherInCity.main.temp
        let icon = weatherInCity.weather[0].icon

        const chosenCity = new City({
            name: name,
            temperature: tempCelsius,
            condition: condition,
            conditionPic: `http://openweathermap.org/img/wn/${icon}@2x.png`
        })


        res.send(chosenCity)
    })

})

router.get('/cities', function (req, res) {
    cities = City.find({}, function (err, cities) {
        res.send(cities)
    })
})

router.post('/city', function (req, res) {

    let name = req.body.name
    let condition = req.body.condition
    let tempCelsius = req.body.temp
    let icon = req.body.conditionPic

    let newCity = new City({
        name: name,
        temperature: tempCelsius,
        condition: condition,
        conditionPic: icon
    })

    newCity.save(function(){
        res.end()
    })
})

router.delete('/city/:cityName', function(req, res){
    let city = req.params.cityName
    City.deleteOne({name: city},function(err,city){
        console.log(city)
        res.end()
    })
})

module.exports = router 