const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  carbonToNitrogenRatio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Waste", wasteSchema);
