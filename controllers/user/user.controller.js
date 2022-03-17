const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../database');
const User = db.users;
const Op = db.Sequelize.Op;
const catchAsync = require("../../utils/catchAsync");
const passwordHelper = require('../../helpers/password');
const tokenHelper = require('../../helpers/token');
const AppError = require('../../utils/appError');

const fetchUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({});
    res.status(200).json({
        users
    });
})

const fetchRegisteredUser = catchAsync(async (req, res, next) => {
    if (!req.cookies.token) {
        return next(new AppError('Cookies not found!'));
    }

    const auth = jwt.verify(
        req.cookies.token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findOne({ where: { id: auth.id } });
    user.password = undefined; // hide the user password

    res.status(200).json({
        user,
    });
});

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
    const users = await User.findAll({});

    res.status(201).json({
        message: 'User registered successfully',
        statusCode: 201,
        users
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
    });
}

const logout = (_, res) => {
    return res.status(202).clearCookie('token').send({
        message: 'Token deleted',
    });
};

const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
        where: {
            id
        }
    })

    const userData = {
        name,
        email
    }

    await user.update(userData);

    const users = await User.findAll({});

    res.status(200).json({ users, statusCode: 200 });
})

module.exports = {
    login,
    logout,
    signup,
    updateUser,
    fetchUsers,
    fetchRegisteredUser
}