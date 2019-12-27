const routes = require('express').Router();

const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('../src/app/controllers/AuthController');

routes.post('/login', AuthController.login);

routes.use(authMiddleware);

routes.get('/', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;