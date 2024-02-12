const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    cityName: {type: String,required: true},
    temperature: {type: Number,required: true},
    description: {type: String,required: true},
    coordinates: {type: Object,required: true},
    feelsLike: {type: Number,required: true},
    humidity: {type: Number,required: true},
    pressure: {type: Number,required: true},
    windSpeed: {type: Number,required: true},
    countryCode: {type: String,required: true},
    rainVolume: {type: Number,default: 0}
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
