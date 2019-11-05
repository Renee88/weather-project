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

    _findCity(cityName) {
        let cities = this.cityData
        for (let city of cities) {
            if (city.name === cityName) {
                return city
            }
        }
    }

    async getDataFromDB() {
      await  $.get('/cities', (cities) => {
            for (let city of cities) {
                this.favourites.push(city)
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

    saveCity(cityName) {
        let newCity = this._findCity(cityName)
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



}


