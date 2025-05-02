const Waste = require("../models/Waste");

// POST /api/fertilizer/calculate-cn
const calculateCNRatio = async (req, res) => {
  try {
    const { wasteInputs } = req.body; // Array of { name, amount }

    if (!wasteInputs || wasteInputs.length === 0) {
      return res.status(400).json({ message: "No waste inputs provided." });
    }

    let totalCarbon = 0;
    let totalWeight = 0;

    for (const input of wasteInputs) {
      const waste = await Waste.findOne({ name: input.name });
      if (!waste) {
        return res.status(404).json({ message: `Waste type '${input.name}' not found.` });
      }

      totalCarbon += input.amount * waste.carbonToNitrogenRatio;
      totalWeight += input.amount;
    }

    const cnRatio = totalCarbon / totalWeight;

    let status = "";
    let message = "";

    if (cnRatio < 30) {
      status = "Too low";
      message = "C:N ratio is too low. Add more carbon-rich materials.";
    } else if (cnRatio > 40) {
      status = "Too high";
      message = "C:N ratio is too high. Add more nitrogen-rich materials.";
    } else {
      status = "Ideal";
      message = "C:N ratio is within the ideal range.";
    }

    res.json({ cnRatio, status, message });
  } catch (error) {
    console.error("Error calculating C:N ratio:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  calculateCNRatio
};
