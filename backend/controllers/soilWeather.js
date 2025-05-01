const SoilWeather = require("../models/SoilWeather");

// GET controller
const getSoilWeatherByArea = async (req, res) => {
  try {
    const { area } = req.params;

    if (!area) {
      return res.status(400).json({ message: "Area parameter is required." });
    }

    const soilWeatherData = await SoilWeather.findOne({ area });

    if (!soilWeatherData) {
      return res.status(404).json({ message: "No data found for this area." });
    }

    res.json(soilWeatherData);
  } catch (error) {
    console.error("Error fetching soil and weather data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST controller
const createSoilWeatherEntry = async (req, res) => {
  try {
    const { area, climate_zone, soil_types, recommended_crops } = req.body;

    // Basic validation
    if (!area || !climate_zone || !soil_types || !recommended_crops) {
      return res.status(400).json({
        message: "All fields (area, climate_zone, soil_types, recommended_crops) are required."
      });
    }

    console.log("Received POST data:", req.body); // ✅ Debug log

    const newSoilWeather = new SoilWeather({
      area,
      climate_zone,
      soil_types,
      recommended_crops,
    });

    await newSoilWeather.save();
    res.status(201).json(newSoilWeather);
  } catch (error) {
    console.error("Error creating soil and weather data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getSoilWeatherByArea,
  createSoilWeatherEntry,
};
