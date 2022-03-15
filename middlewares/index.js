const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

module.exports = [
    express.json({ limit: '2mb' }),
    express.urlencoded({ extended: true, limit: '2mb' }),
    compression(),
    cookieParser(),
    cors({
        origin: true,
        methods: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: [
            'x-now-id',
            'x-now-trace',
            'x-powered-by',
            'Origin',
            'Accept',
            'Content-Type',
            'Set-Cookie',
            'Authorization',
        ],
        credentials: true,
    }),
    helmet(),
    morgan('tiny'),
];
