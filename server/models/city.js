const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    cityName: String,
    temp: Number,
    desc: String,
    pic: String,
    isSaved: Boolean
})

const City = mongoose.model("city", citySchema)
module.exports = City