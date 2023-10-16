// vim:foldmethod=syntax:foldlevel=2:foldnestmax=2
'use strict';

const request = require('supertest');
const debug = require('debug')('test');


require('dotenv').config();
const PORT = process.env.PORT;
const baseURL = `http://localhost:${PORT}`;

describe('Comments', () => {
    const user = {id: 4};
    const comment = {};
    const artwork = {id: 2};

    beforeAll(async () => {
        const response = await request(baseURL)
            .post('/v1/users/login')
            .send({ email: 'pro.test@icarios.net', password: 'password' });
        user.token = await response._body.token;
    });

    afterAll(async () => {
    });

    // Création d'un commentaire
    describe('POST /v1/users/:id/comments', () => {
        test('Should return 201', async () => {
            const payload = {
                data: {
                    content: 'Un commentaire de test',
                    artwork_id: artwork.id,
                },
            };
            const response = await request(baseURL)
                .post(`/v1/users/${user.id}/comments`)
                .send(payload)
                .set('Authorization', `Bearer ${user.token}`);
            comment.id = response._body.id;
            expect(response.statusCode).toBe(201);
        });
    });

    // Liste des commentaires d'un utilisateurs
    describe('GET /v1/users/:id/comments', () => {
        test('Should return comms', async () => {
            const response = await request(baseURL)
                .get(`/v1/users/${user.id}/comments`);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            expect(response.statusCode).toBe(200);
        });
    });

    // Patch du commentaire
    describe('PATCH /v1/comments/:id', () => {
        test('Should return 200', async () => {
            const response = await request(baseURL)
                .patch(`/v1/comments/${comment.id}`)
                .send({ content: 'Un test d\'update' })
                .set('Authorization', `Bearer ${user.token}`);
            expect(response.statusCode).toBe(200);
        });
    });

    // Effacement du commentaire
    describe('DELETE /v1/comments/:id', () => {
        test('Should return 200', async () => {
            const response = await request(baseURL)
                .delete(`/v1/comments/${comment.id}`)
                .set('Authorization', `Bearer ${user.token}`);
            expect(response.statusCode).toBe(200);

        });
    });

});
