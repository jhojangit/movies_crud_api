const request = require('supertest');
const app = require('../app');
require('../models');


let id;

test('GET /actors debe traer todos los actores', async () => {
        const res = await request(app).get('/actors');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

test('POST /actors debe crear un actor', async () => {
    const actor = {
        firstName: "Jhojan",
        lastName: "Rivera",
        image: "https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x",
        nationality: "China",
        birthday: 1993
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});


test('PUT /actors/:id debe actualizar un actor', async () => {
    const actorUpdate = { firstName: "Andrés" }
    const res = await request(app).put(`/actors/${id}`).send(actorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actorUpdate.name);
});


test('DELETE /actors/:id debe eliminar un album', async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});