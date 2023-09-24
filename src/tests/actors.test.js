const request = require('supertest');
const app = require('../app');

test("GET /actors Debere retornar status 200",  () => {
    const res = request(app).get('/actors')
    expect(res.status).toBe(200)
})