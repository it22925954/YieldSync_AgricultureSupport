const SoilWeather = require("../models/SoilWeather");

exports.getSoilWeather = async (req, res) => {
  try {
    const area = req.params.area; // Get area from request parameters

    // Find the soil and weather data for that area
    const data = await SoilWeather.findOne({ area });
    if (!data) {
      return res.status(404).json({ message: "Area not found" });
    }

    // Respond with the soil and weather data
    res.json(data);
  } catch (error) {
    console.error("Error fetching soil and weather data:", error);
    res.status(500).json({ message: "Server error" });
  }
};