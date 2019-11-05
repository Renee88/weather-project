const express = require('express')
const router = express.Router()
const apiKey = "369756fcf0f7ba8e9e0e693bc2c5e3f1"
const request = require('request')
const City = require('../models/City')



router.get('/city/:cityName', function (req, res) {
    let city = req.params.cityName || ""
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`, function (err, response) {

        let weatherInCity = JSON.parse(response.body)
        let name = weatherInCity.name || weatherInCity.message
        if (name === weatherInCity.message) {
            console.log(name)
            res.send({
                name: name,
                city_id: weatherInCity.cod
            })
            return
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
        })

        console.log(chosenCity)
        res.send(chosenCity)
    })

})

router.get('/cities', function (req, res) {
    const cities = City.find({}, function (err, cities) {
        res.send(cities)
    })
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
            let fav = !req.body.fav

            let newCity = new City({
                city_id: city_id,
                name: name,
                temperature: tempCelsius,
                condition: condition,
                conditionPic: icon,
                fav: true
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
        let name = weatherInCity.name
        let condition = weatherInCity.weather[0].description
        let tempCelsius = weatherInCity.main.temp
        let icon = weatherInCity.weather[0].icon

        let updatedCity = new City({
            city_id: city_id,
            name: name,
            temperature: tempCelsius,
            condition: condition,
            conditionPic: `http://openweathermap.org/img/wn/${icon}@2x.png`
        })
        
            console.log(updatedCity)
        
            City.findOneAndUpdate({city_id: city_id },updatedCity,{useFindAndModify: false}, function (err, res) {
        
            })
    })
})


module.exports = router 