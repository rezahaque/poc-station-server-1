module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                  arg: true,
                  msg: "Please provide a valid email!",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: {
                    args: [6],
                    msg: "Minimum 6 characters allowed for password",
                },
            }
        }
    })

    return User;
}