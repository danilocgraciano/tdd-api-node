const request = require('supertest');
const app = require('../../src/app');

const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('Should authenticate with valid credentials', async () => {

        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: '123123'
            });

        expect(response.status).toBe(200);
    });

    it('Should not authenticate with invalid credentials', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: '',
                password: ''
            });

        expect(response.status).toBe(401);
    });

    it('Should not authenticate with invalid password', async () => {

        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: '999999'
            });

        expect(response.status).toBe(401);
    });

    it('Should return a jwt token when authenticated', async () => {

        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .post('/login')
            .send({
                email: user.email,
                password: '123123'
            });

        expect(response.body).toHaveProperty('token');
    });

    it('Should be able to access private routes when authenticated', async () => {

        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .get('/')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('Should not be able to access private routes without token', async () => {

        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .get('/');

        expect(response.status).toBe(401);
    });

    it('Should not be able to access private routes with a invalid token', async () => {

        const user = await factory.create('User', {
            password: '123123'
        });

        const response = await request(app)
            .get('/')
            .set('Authorization', `Bearer 123123`);

        expect(response.status).toBe(401);
    });
});
