import express from 'express';

let configViewEngine = (app) => {
    app.use(express.static('./src/public')) // static để lấy ảnh trong file public
    app.set('view engine', 'ejs')
    app.set('views', './src/views')
}

module.exports = configViewEngine;
