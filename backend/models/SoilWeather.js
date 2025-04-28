const mongoose = require("mongoose");

const soilWeatherSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  weather: {
    type: String, // Sunny, Rainy, etc.
    required: true,
  },
  soilType: {
    type: String, // Loamy, Clay, Sandy, etc.
    required: true,
  },
  plants: [
    {
      type: String, // Plant names related to this soil type & weather
    },
  ],
});

const SoilWeather = mongoose.model("SoilWeather", soilWeatherSchema);
module.exports = SoilWeather;
