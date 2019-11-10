class TempManager {
    constructor() {
        this.cityData = []

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
        let cities = this.cityData
        for (let city of cities) {
            if (city.city_id === cityId && city.favourite === true) {
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

    _findCityById(cityId) {
        let cities = this.cityData
        for (let city of cities) {
            if (city.city_id === cityId) {
                return city
            }
        }
    }


    async getDataFromDB() {
        let favCities = []
        await $.get('/cities', (cities) => {
            for (let city of cities) {
                let displayTemp = parseInt(city.temperature)
                city.temperature = displayTemp
                let cityId = city.city_id
                favCities.push(city)
            }
        })
        return favCities
    }



    async getCityData(cityName) {
        const cityForAPI = this._stringforAPI(cityName)
        let route = `/city/${cityForAPI}`
        if (route === '/city/') {
            await $.get('/city')
        } else {
            let data = await $.get(route)
            console.log(data)
            data.temperature = parseInt(data.temperature)
            this._checkCity(data.city_id) ? null
                : this.cityData.push(data)
                console.log(this.cityData)
        }
    }

    removeNotFound(cityId) {
        let counter = 0
        let cities = this.cityData
        for (let city of cities) {
            if (city.city_id === cityId) {
                this.cityData.splice(counter, 1)
            }
            counter++
        }
    }



    saveCity(cityId) {
        let newCity = this._findCityById(cityId)
        newCity.favourite = true
        let cities = this.cityData
        let counter = 0
        for (let city of cities) {
            if (city.city_id === cityId && city.favourite === false) {
                splice(counter, 1, newCity)
            }
        }
        console.log(newCity)
        $.post(`/city`, newCity, function (err, res) {
            console.log(`${newCity.name} was added to DB`)
        })
    }



    removeCity(cityId) {

        if (this._checkFavCity(cityId)) {
            let counter = 0
            let cities = this.cityData
            let favCities = cities.filter(c => c.favourite === true)
            for (let city of favCities) {
                if (city.city_id === cityId) {
                    this.favourites.splice(counter, 1)
                }
                counter++
            }
        }

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
        await $.ajax({
            method: "PUT",
            data: { city_id: cityId },
            url: '/city',
            success: (updatedCity) => {
                let udpdatedCityId = updatedCity.city_id
                let cityId = this._findCity(udpdatedCityId)
                let cities = this.cityData
                let counter = 0
                for (let city of cities) {
                    if (city.city_id === cityId) {
                        let displayTemp = parseInt(city.temperature)
                        city.temperature = displayTemp
                        this.favourites.splice(counter, 1, city)
                    }
                    counter++
                }
            }

        })
    }

    displaySearchCities() {
        let notFavs = []
        let cities = this.cityData
        for (let city of cities) {
            if (city.favourite === false) {
                notFavs.push(city)
            }

        }

        return notFavs
    }
}


