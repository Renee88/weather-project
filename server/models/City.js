const mongoose = require('mongoose')
Schema = mongoose.Schema

weatherSchema = new Schema({
    city_id: Number,
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('city', weatherSchema)

module.exports = City