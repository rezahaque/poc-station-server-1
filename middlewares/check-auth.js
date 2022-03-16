const { promisify } = require('util');
const jwt = require("jsonwebtoken");
const db = require('../database');
const User = db.users;

module.exports = async (req, res, next) => {
  try {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please login to process!')
        );
    }

    const decoded = await promisify(jwt.verify)(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const freshUser = await User.findOne({ where: { id: decoded.id }});

    if (!freshUser) {
        return next('User does not exist.', 401);
    }

    req.user = freshUser;
    res.locals.user = freshUser;

    next()
  } catch (err) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};