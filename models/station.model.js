module.exports = (sequelize, DataTypes) => {
    const Station = sequelize.define("station", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Station;
}