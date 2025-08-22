import { test, expect } from '@playwright/test';
import { getApiHeaders } from '../../utils/helpers.js';
import projectConstants from '../data/constants.js'

const API_BASE = process.env.API_BASE_URL
const validUser = projectConstants.API.loginUser
const invalidUser = {
    email : 'invalid@email.com',
    password: 'notGood'
}

test.describe('POST /login - Login Tests', () => {

    test('should login successfully with valid credentials', async ({ request }) => {
        const response = await request.post(`${API_BASE}/login`, {
            headers: getApiHeaders({}),
            data: validUser
        });

        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('token');
        console.log({data})
    });

    test('should fail login with invalid credentials', async ({ request }) => {
        const response = await request.post(`${API_BASE}/login`, {
            headers: getApiHeaders({}),
            data: invalidUser
        });

        expect(response.status()).toBe(400);
        const data = await response.json();

        // TODO: Improvement: We can introduce Regex for error messages to relax the assertions
        expect(data).toStrictEqual({ error: 'user not found' })
    });

    test('should require authentication (API key)', async ({ request }) => {
        const loginData = {
            email: validUser.email,
            password: validUser.password
        };

        // Test without API key
        const responseWithoutKey = await request.post(`${API_BASE}/login`, {
            data: loginData
        });

        expect(responseWithoutKey.status()).toBe(401);
    });

    // TODO: Defect: Login is allowing invalid password
    test.skip('should fail login with invalid password', async ({ request }) => {
        const loginData = {
            email: validUser.email,
            password: invalidUser.password
        };
        
        const response = await request.post(`${API_BASE}/login`, {
            headers: getApiHeaders({}),
            data: loginData
        });

        expect(response.status()).toBe(400);
    });

});
