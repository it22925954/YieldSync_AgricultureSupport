const express = require("express");
const router = express.Router();
const { calculateCNRatio } = require("../controllers/fertilizerController");

router.post("/calculate-cn", calculateCNRatio);

module.exports = router;
