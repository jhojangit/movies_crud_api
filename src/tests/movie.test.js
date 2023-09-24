const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actors');
const Director = require('../models/Directors');
const Genre = require('../models/Genres');
require('../models');


let id;

test('GET /movies debe traer todos las movies', async () => {
        const res = await request(app).get('/movies');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una movie', async () => {
    const movie = {
        name: "Saw",
        image: "https://i.blogs.es/089f63/saw-orden-saga-espinof/1366_2000.jpg",
        synopsis: "Película de terror y suspenso en la que los participantes juegan para sobrevivir a trampas mortales",
        releaseYear: 2000
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});


test('PUT /movies/:id debe actualizar un movie', async () => {
    const movieUpdate = { name: "Saw 2" }
    const res = await request(app).put(`/movies/${id}`).send(movieUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdate.name);
});


test('POST /movies/:id/actors debe insertar los actores de una movie', async () => {
    const actor = await Actor.create({
        firstName: "Jhojan",
        lastName: "Rivera",
        image: "https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x",
        nationality: "China",
        birthday: 1993
    });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});



test('POST /movies/:id/directors debe insertar los actores de una movie', async () => {
    const director = await Director.create({
        firstName: "Maurucio",
        lastName: "Toro",
        nationality: "cicore",
        image: "https://smoda.elpais.com/wp-content/uploads/2017/08/40mujeres14-1-635x480.jpg",
        birthday: 2000
    });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});



test('POST /movies/:id/genres debe insertar los actores de una movie', async () => {
    const genre = await Genre.create({
        name: "Comedy"
    });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});




test('DELETE /movies/:id debe eliminar un album', async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});