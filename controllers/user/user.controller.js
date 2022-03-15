const bcrypt = require('bcryptjs');
const db = require('../../database');
const User = db.users;
const Op = db.Sequelize.Op;
const catchAsync = require("../../utils/catchAsync");
const passwordHelper = require('../../helpers/password');
const tokenHelper = require('../../helpers/token');
const AppError = require('../../utils/appError');

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    const existedUser = await User.findOne({
        where: { email }
    }) || {};

    if(!existedUser) {
        return next(new AppError('Incorrect mobile number or password', 401));
    }

    const isMatch = await passwordHelper.matchPassowrd(password, existedUser.password);

    if (!isMatch)
        return next(new AppError('Incorrect mobile number or password!', 401));

    createSendToken(existedUser, 200, res);
});

const signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    const existedUser = await User.findOne({
        where: { email }
    }) || {};

    if(!existedUser) {
        return next(new AppError('The user is already registered!', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
        name,
        email,
        password: hashedPassword
    }

    await User.create(user);

    res.status(200).json({
        message: 'User registered successfully'
    })
})

const createSendToken = (user, statusCode, res) => {
    const token = tokenHelper.generateAccessToken(user.id);
    const timeLimit = 31536000000; // one year

    const cookieOptions = {
        expires: new Date(Date.now() + timeLimit),
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production' ? true : false,
        secure: false,
    };

    res.cookie('token', token, cookieOptions);

    user.password = undefined; // hide the user password

    res.status(statusCode).json({
        status: 'success',
        statusCode,
        user,
        token
    })
}

module.exports = {
    login,
    signup
}