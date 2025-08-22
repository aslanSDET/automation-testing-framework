import { test, expect } from '@playwright/test';
import { validateUserSchema, validateUsersArraySchema, validateErrorSchema } from './schemas/user.schema.js';
import projectConstants from '../data/constants.js'

const API_BASE = process.env.API_BASE_URL;

test.describe('Get User Tests', () => {

    test('should get all users successfully per API contract', async ({ request }) => {
        const response = await request.get(`${API_BASE}/users`);
        
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data).toBeTruthy();

        // Schema validation using imported schemas
        expect(
            validateUsersArraySchema(data)
        ).toEqual([]);
    });

    test('should get single user by valid ID', async ({ request }) => {
        const response = await request.get(`${API_BASE}/users/${projectConstants.API.validUser}`);
        
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data).toBeTruthy();
        expect(data.id).toBe(projectConstants.API.validUser);

        // Schema validation
        expect(
            validateUserSchema(data)
        ).toEqual([]);
    });

    const paginationScenarios = [
        { page: 1, per_page: 1, description: 'single user per page' },
        { page: 1, per_page: 5, description: 'five users per page' },
        { page: 2, per_page: 3, description: 'second page with three users' },
    ];

    paginationScenarios.forEach(({ page, per_page, description }) => {
        test(`should get users with pagination: ${description}`, async ({ request }) => {
            const response = await request.get(`${API_BASE}/users?page=${page}&per_page=${per_page}`);
            
            expect(response.status()).toBe(200);
            
            const data = await response.json();
            expect(data).toBeTruthy();

            expect(data.length).toBeLessThanOrEqual(per_page);
                        
        });
    });

});