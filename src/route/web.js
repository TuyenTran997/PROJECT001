import express from 'express';
import homeController from '../controllers/homeController'

let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/hoidanit', (req, res) => {
        return res.send('Hoi dan It')
    })

    return app.use('/', router)
}

module.exports = initWebRoutes