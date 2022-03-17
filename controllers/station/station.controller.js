const catchAsync = require("../../utils/catchAsync");
const db = require('../../database');
const Station = db.stations;
const User = db.users;

const fetchStations = catchAsync(async (req, res, next) => {
    const stations = await Station.findAll({
        include: [{
            model: User,
            as: "user"  
        }],
        limit: 5,
        offset: 0
    });
    res.status(200).json({
        stations
    });
})

const addStation = catchAsync(async (req, res, next) => {
    const { name, comment } = req.body;

    const station = {
        name,
        comment,
        userId: req.user.dataValues.id
    }

    await Station.create(station);

    const stations = await Station.findAll({
        include: [{
            model: User,
            as: "user"  
        }],
        limit: 5,
        offset: 0
    });

    res.status(201).json({
        statusCode: 201,
        message: "Station created successfully!",
        stations
    })
});

const deleteStation = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    await Station.destroy({
        where: {
            id
        }
    })

    const stations = await Station.findAll({
        include: [{
            model: User,
            as: "user"  
        }],
        limit: 5,
        offset: 0
    });

    res.status(200).json({
        message: 'Deleted successfully',
        stations
    })
});

const updateStation = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, comment } = req.body;

    const station = await Station.findOne({
        where: {
            id
        }
    })

    const stationData = {
        name,
        comment
    }

    await station.update(stationData);

    const allstations = await Station.findAll({
        include: [{
            model: User,
            as: "user"  
        }],
        limit: 5,
        offset: 0
    });

    res.status(200).json({
        statusCode: 200,
        message: "Successfully updated",
        stations: allstations
    })
})

module.exports = {
    fetchStations,
    addStation,
    updateStation,
    deleteStation
}