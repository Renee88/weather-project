class TempManager {
    constructor() {
        this.favourites = []
        this.cityData = []

    }

    _addToFavourites(city) {
        this.favourites.push(city)
    }

    _stringforAPI(string) {
        const brokenString = string.split(" ")
        if (brokenString.length > 1) {
            for (let word in brokenString) {
                let upperCased = brokenString[word][0].toUpperCase() + brokenString[word].slice(1)
                brokenString.splice(word, 1, upperCased)
            }

            string = brokenString.join("+")
        }
        return string
    }

    _checkCity(cityId) {
        let cities = this.cityData
        for (let city of cities) {
            if (city.city_id === cityId) {
                return true
            }
        }
        return false
    }

    _checkFavCity(cityId) {
        let cities = this.favourites
        for (let city of cities) {
            if (city.city_id === cityId) {
                return true
            }
        }
        return false
    }

    _findCity(cityName) {
        let cities = this.cityData
        for (let city of cities) {
            if (city.name === cityName) {
                return city
            }
        }
    }

    _findCityById(cityId){
        let cities = this.cityData
        for (let city of cities) {
            if (city.city_id === cityId) {
                return city
            }
        }
    }

    _findFavById(cityId){
        let cities = this.favourites
        for (let city of cities) {
            if (city.city_id === cityId) {
                return city
            }
        }
    }



    async getDataFromDB() {
        await $.get('/cities', (cities) => {
            for (let city of cities) {
                let cityId = city.city_id
                let displayTemp = parseInt(city.temperature)
                city.temperature = displayTemp
                this._checkFavCity(cityId) ? null
                    : this.favourites.push(city)
            }

        })
    }

    async getCityData(cityName) {
        const cityForAPI = this._stringforAPI(cityName)
        let data = await $.get(`/city/${cityForAPI}`)
        data.temperature = parseInt(data.temperature)
        this._checkCity(data.city_id) ? null
            : this.cityData.push(data)
    }


    saveCity(cityId) {
        let newCity = this._findCityById(cityId)
        this._addToFavourites(newCity)
        console.log(newCity)
        $.post(`/city`, newCity, function (err, res) {
            console.log(`${newCity.name} was added to DB`)
        })
    }



    removeCity(cityId) {
        $.ajax({
            method: "DELETE",
            url: `/city/${cityId}`,
            success: function (err, res) {
                console.log(`${cityId} was succesfully removed`)
            },
            error: function (err) {
                console.log('Delete request did not succeed')
            }

        })

    }

    async updateCity(cityId) {
        let city = this._findFavById(cityId)
        console.log(city)
       await $.ajax({
            method: "PUT",
            data: {city_id: city.city_id},
            url: '/city',
            success: (updatedCity) => {
                let udpdatedCityId = updatedCity.city_id
                let cityId = this._findCity(udpdatedCityId)
                let cities = this.favourites
                let counter = 0
                for (let city of cities) {
                    counter++
                    if (city.city_id === cityId) {
                        let displayTemp = parseInt(city.temperature)
                        city.temperature = displayTemp
                        this.favourites.splice(counter, 1, city)
                    }
                }
            }

        })
    }
}


