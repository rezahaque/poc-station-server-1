const express = require("express");
const router = express.Router();
const stationController = require("../../controllers/station/station.controller");
const checkAuth = require('../../middlewares/check-auth');

router.post('/', checkAuth, stationController.addStation);

router.get('/', checkAuth, stationController.fetchStations);
router.delete('/:id', checkAuth, stationController.deleteStation);

module.exports = router;
