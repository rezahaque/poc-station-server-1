const express = require("express");
const router = express.Router();
const stationController = require("../../controllers/station/station.controller");

router.post('/', stationController.addStation);

module.exports = router;
