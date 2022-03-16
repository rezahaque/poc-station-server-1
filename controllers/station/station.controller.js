const catchAsync = require("../../utils/catchAsync");
const db = require('../../database');
const Station = db.stations;
const User = db.users;

const fetchStations = catchAsync(async (req, res, next) => {
    const stations = await Station.findAll({
        include: [{
            model: User,
            as: "user"  
        }]
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
        }]
    });

    res.status(201).json({
        statusCode: 201,
        message: "Station created successfully!",
        stations
    })
});

const deleteStation = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const station = await Station.findOne({
        where: {
            id
        }
    })

    if(station.userId === req.user.dataValues.id) {
        await Station.destroy({
            where: {
                id
            }
        })

        const stations = await Station.findAll({
            include: [{
                model: User,
                as: "user"  
            }]
        });

        res.status(200).json({
            message: 'Deleted successfully',
            stations
        })
    }
})

module.exports = {
    fetchStations,
    addStation,
    deleteStation
}