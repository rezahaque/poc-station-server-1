const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
    });
};

module.exports = {
    generateAccessToken,
};