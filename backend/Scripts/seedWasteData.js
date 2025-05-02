// backend/scripts/seedWasteData.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Waste = require("../models/Waste");

dotenv.config();

const wasteData = [
  { name: "Humus", carbonToNitrogenRatio: 10 },
  { name: "Food Wastes", carbonToNitrogenRatio: 15 },
  { name: "Grass Clippings", carbonToNitrogenRatio: 20 },
  { name: "Horse Manure", carbonToNitrogenRatio: 25 },
  { name: "Fruit Wastes", carbonToNitrogenRatio: 35 },
  { name: "Foliage", carbonToNitrogenRatio: 80 },
  { name: "Corn Stalks", carbonToNitrogenRatio: 60 },
  { name: "Straw", carbonToNitrogenRatio: 80 },
  { name: "Bark", carbonToNitrogenRatio: 130 },
  { name: "Paper", carbonToNitrogenRatio: 170 },
  { name: "Sawdust", carbonToNitrogenRatio: 200 },
  { name: "Wood", carbonToNitrogenRatio: 700 },
  { name: "Duck Dung", carbonToNitrogenRatio: 8 },
  { name: "Human Excreta", carbonToNitrogenRatio: 8 },
  { name: "Chicken Dung", carbonToNitrogenRatio: 10 },
  { name: "Goat Dung", carbonToNitrogenRatio: 12 },
  { name: "Pig Dung", carbonToNitrogenRatio: 18 },
  { name: "Sheep Dung", carbonToNitrogenRatio: 19 },
  { name: "Cow Dung", carbonToNitrogenRatio: 24 },
  { name: "Buffalo Dung", carbonToNitrogenRatio: 24 },
  { name: "Water Hyacinth", carbonToNitrogenRatio: 25 },
  { name: "Elephant Dung", carbonToNitrogenRatio: 43 },
  { name: "Maize Straw", carbonToNitrogenRatio: 60 },
  { name: "Rice Straw", carbonToNitrogenRatio: 70 },
  { name: "Wheat Straw", carbonToNitrogenRatio: 90 }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Waste.deleteMany(); // Optional: clear existing data
    await Waste.insertMany(wasteData);

    console.log("✅ Waste data inserted successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to insert waste data:", error);
    process.exit(1);
  }
};

seedData();
