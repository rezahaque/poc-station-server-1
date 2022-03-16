module.exports = (sequelize, DataTypes) => {
    const Station = sequelize.define("station", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Station;
}