const request = require('supertest');
const app = require('../app');
require('../models');


let id;

test('GET /directors debe traer todos los actores', async () => {
        const res = await request(app).get('/directors');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

test('POST /directors debe crear un actor', async () => {
    const director = {
        firstName: "Maurucio",
        lastName: "Toro",
        nationality: "cicore",
        image: "https://smoda.elpais.com/wp-content/uploads/2017/08/40mujeres14-1-635x480.jpg",
        birthday: 2000
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
});


test('PUT /directors/:id debe actualizar un actor', async () => {
    const directorUpdate = { firstName: "Juan" }
    const res = await request(app).put(`/directors/${id}`).send(directorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(directorUpdate.name);
});


test('DELETE /directors/:id debe eliminar un album', async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});