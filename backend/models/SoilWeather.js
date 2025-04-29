const mongoose = require("mongoose");

const soilWeatherSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  climate_zone: {
    type: String, // e.g., Dry Zone, Wet Zone, Intermediate Zone
    required: true,
  },
  soil_types: {
    type: [String], // e.g., ["Loamy", "Clay"]
    required: true,
  },
  recommended_crops: {
    type: [String], // e.g., ["Paddy", "Maize"]
    required: true,
  },
});

const SoilWeather = mongoose.model("SoilWeather", soilWeatherSchema);
module.exports = SoilWeather;
