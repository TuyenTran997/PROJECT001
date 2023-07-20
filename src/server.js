import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine'
import initWebRoures from './route/web'
import connectDB from '../src/config/connectDB'
require('dotenv').config() // dùng để chạy file .env


let app = express();
// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

viewEngine(app);
initWebRoures(app);

let port = process.env.PORT || 3000;
// port = undefined => port = 3000

app.listen(port, () => {
    console.log('Backend Nodejs is running on the port : ' + port)
})
