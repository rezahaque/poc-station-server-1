const catchAsync = require("../../utils/catchAsync");
const db = require('../../database');
const Station = db.stations;

const addStation = catchAsync(async (req, res, next) => {
    const { comment, userId } = req.body;

    const station = {
        comment,
        userId
    }

    await Station.create(station)

    res.status(200).json({
        message: "Station created successfully!"
    })
})

module.exports = {
    addStation
}