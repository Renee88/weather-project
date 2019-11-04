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


    getDataFromDB() {
        $.get('/cities', (data) => {
            console.log(data)
        })
    }

    async getCityData(cityName) {
        const cityForAPI = this._stringforAPI(cityName)
        const data = await $.get(`/city/${cityForAPI}`)
        this.cityData.push(data)
    }

    _findCity(cityName) {
        let cities = this.cityData
        for (let city of cities) {
            if (city.name === cityName) {
                return city
            }
        }
    }

    _checkId(newCity) {
        let cities = this.cityData
        for (let city of cities) {
            if (city.city_id === newCity.city_id) {
                return true
            }
        }
    }

    saveCity(cityName) {
        let newCity = this._findCity(cityName)
        this._checkId(newCity) ? null
        : $.post(`/city`, city, function (err, res) {
            console.log(`${city.name} was added to DB`)
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


