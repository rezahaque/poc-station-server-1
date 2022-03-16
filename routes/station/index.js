const express = require("express");
const router = express.Router();
const stationController = require("../../controllers/station/station.controller");
const checkAuth = require('../../middlewares/check-auth');

router.post('/', checkAuth, stationController.addStation);

router.get('/', checkAuth, stationController.fetchStations);

module.exports = router;
