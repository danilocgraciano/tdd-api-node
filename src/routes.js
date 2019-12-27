const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const SessionController = require('../src/app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;