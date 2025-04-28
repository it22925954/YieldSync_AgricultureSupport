const express = require("express");
const router = express.Router();
const soilWeatherController = require("../controllers/soilWeather");

// Route to get soil and weather data for a specific area
router.get("/:area", soilWeatherController.getSoilWeather);

// Route to update soil and weather data for a specific area
router.post("/update", soilWeatherController.updateSoilWeather);

module.exports = router;
// 