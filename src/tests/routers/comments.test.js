// vim:foldmethod=syntax:foldlevel=2:foldnestmax=2
'use strict';

const request = require('supertest');

require('dotenv').config();
const PORT = process.env.PORT;
const baseURL = `http://localhost:${PORT}`;

console.log(baseURL);

const commentsCtrl = require('../../api/controllers/comments.js');

describe('Comments', () => {

    describe('POST /v1/users/:id/comments', () => {
        const newCom = {
            data: {
                content: 'Un commentaire de test',
                artwork_id: '14'
            },
        };
        beforeAll(async () => {
            newCom.id = await request(baseURL).post('/v1/users/4/comments');
        });
        afterAll(async () => {
            await request(baseURL).delete(`/v1/comments/${newCom.id}`);
        });
        test('Should return 200', async () => {
            const response = await request(baseURL).get(`/v1/comments/${newCom.id}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.error).toBe(null);
        });
        test('Should return comms', async () => {
            const response = await request(baseURL).get(`/v1/comments/${newCom.id}`);
            expect(response.body.data.length >= 1).toBe(true);
        });
    });

});
