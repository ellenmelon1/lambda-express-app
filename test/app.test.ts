const request = require('supertest');
const app = require('../src/app.js');

describe('GET requests', () => {
    describe('GET /', () => {
        it('responds hello world', async () => {
            const response = await request(app)
            .get('/');
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Hello World!')
        })
    })
    describe('GET /users', () => {
        it('responds with original 2 users', async () => {
            const response = await request(app)
            .get('/users');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual([{
                id: 1,
                name: 'Joe'
              }, {
                id: 2,
                name: 'Jane'
              }])

        })
    })
    describe('GET /users/:userId', () => {
        it('responds with requested user at /users/:userId', async () => {
            const response = await request(app)
            .get('/users/1');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({
                id: 1,
                name: 'Joe'
              })

        })
        it('responds with 404 for non-existent user at /users/:userId', async () => {
            const response = await request(app)
            .get('/users/3');
            expect(response.status).toEqual(404);
            expect(response.body).toEqual({})
        })
        it('responds with 400 for invalid user id at /users/:userId', async () => {
            const response = await request(app)
            .get('/users/abc');
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({})
        })
    })
})

describe('POST requests', () => {
    describe('POST /users', () => {
        it('responds with name and id of newly added user', async () => {
            const response = await request(app)
            .post('/users')
            .send({name: 'Bob'});
            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                id: 3,
                name: 'Bob'
              })

        })
        it('responds with 400 for empty param \'name\' in request body', async () => {
            const response = await request(app)
            .post('/users')
            .send({name: ''});
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({})
        })
        it('responds 400 for invalid param type \'name\' in request body', async () => {
            const response = await request(app)
            .post('/users')
            .send({name: 123})
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({})
        })
        it('responds with 400 when request body does not contain required params', async () => {
            const response = await request(app)
            .post('/users')
            .send({});
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({})
        })
    })
})

describe('Invalid path', () => {
    it('responds with 404 and appropriate error message for invalid path', async () => {
        const response = await request(app)
        .get('/invalid');
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({ msg: 'path not found' })
    })
})
