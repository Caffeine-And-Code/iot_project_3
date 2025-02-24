var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var controlsRouter = require('./routes/control');
var cors = require('cors')

async function getApp()
{
    var app = express();

    app.use(cors())

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/control', controlsRouter)   
    return app;
}

module.exports = getApp;