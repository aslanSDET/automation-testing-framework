import { test, expect } from '@playwright/test';
import { validateCreateUserResponseSchema } from './schemas/user.schema.js';
import { getApiHeaders } from '../../utils/helpers.js';
import projectConstants from '../data/constants.js'

const API_BASE = process.env.API_BASE_URL
const key = process.env.READWRITE_API_KEY

// TODO: Current API does not write to DB. Once DB is established, confirm resource is created at DB.
test.describe('POST /users - Create User Tests', {
    tag: ['@postUser', '@api']
}, () => {
    
    test('should create user with valid data', async ({ request }) => {
        const userData = {
            name: 'Yusuf Aslan',
            job: 'Software Engineer in Test'
        };
        
        let response = await request.post(`${API_BASE}/users`, {
            headers: getApiHeaders({key}),
            data: userData
        });
        
        expect(response.status()).toBe(201);
        
        const data = await response.json();

        // Verify correct properties were passed
        expect(data).toHaveProperty('name', userData.name);
        expect(data).toHaveProperty('job', userData.job);

        // Schema validation
        expect(
            validateCreateUserResponseSchema(data)
        ).toEqual([]);
    });

    // TODO: Application does not throw any errors for missing fields. Hence skipping test. Unskip once fixed
    test.skip('should handle invalid input data', async ({ request }) => {
        const invalidData = {
            // Missing required fields
        };
        
        const response = await request.post(`${API_BASE}/users`, {
            headers: getApiHeaders({key}),
            data: invalidData
        });

        expect(response.status()).toBe(500)
    });

    // TODO: Application does not throw any errors for duplicate users. Hence skipping test. Unskip once fixed
    test.skip('should handle duplicate data gracefully', async ({ request }) => {
        
        const existingUser = projectConstants.API.validUser;

        const userData = {
            name: existingUser.id,
            job: existingUser.job
        };
        
        // Create user
        const response = await request.post(`${API_BASE}/users`, {
            headers: getApiHeaders({key}),
            data: userData
        });
        
        expect(response.status()).toBe(409);

    });

    test('should not allow creating resource without API key', async ({ request }) => {
        const userData = {
            name: 'Test User',
            job: 'Tester'
        };
        
        // Test without API key
        const response = await request.post(`${API_BASE}/users`, {
            data: userData
        });
        
        // Should fail without API key
        expect(response.status()).toBe(401);
    });

    // TODO: Defect: Application allows read-only user to create resource
    test.skip('should not allow read-only user to create resource', async ({ request }) => {
        const userData = {
            name: 'Test User',
            job: 'Tester'
        };
        
        // Test without API key
        const response = await request.post(`${API_BASE}/users`, {
            data: userData,
            headers: getApiHeaders({})
        });
        
        // Should fail without API key
        expect(response.status()).toBe(401);
    });
});