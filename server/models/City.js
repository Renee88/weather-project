const mongoose = require('mongoose')
Schema = mongoose.Schema

weatherSchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('city', weatherSchema)

module.exports = City