const express = require("express");
const router = express.Router();

const {
  getSoilWeatherByArea,
  createSoilWeatherEntry,
} = require("../controllers/soilWeather");

router.get("/:area", getSoilWeatherByArea);
router.post("/", createSoilWeatherEntry);

module.exports = router;
