import { test, expect } from '@playwright/test';
import { validateUserSchema, validateUsersArraySchema, validateErrorSchema } from './schemas/user.schema.js';
import { getApiHeaders } from '../../utils/helpers.js';
import projectConstants from '../data/constants.js'

const API_BASE = process.env.API_BASE_URL;

// TODO: Ticket#001 data injection helper
// TODO: Ticket#002 get call helper: Queries to be send as function option
test.describe('Get User Tests', {
    tag: ['@getUser', '@api']
}, () => { 

    test('should get all users successfully per API contract', {
        tag: ['@smoke']
    }, async ({ request }) => {
        const response = await request.get(`${API_BASE}/users`, {
            headers: getApiHeaders({})
        });
        
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data.data).toBeTruthy();
        
        // TODO: Once Ticket#001 is resolved, check against entire expected object

        // Schema validation using imported schemas
        expect(
            validateUsersArraySchema(data.data)
        ).toEqual([]);
    });

    test('should get single user by valid ID', {
        tag: ['@smoke']
    }, async ({ request }) => {
        const response = await request.get(`${API_BASE}/users/${projectConstants.API.validUser.id}`,
            { headers: getApiHeaders({}) }
        );
        
        expect(response.status()).toBe(200);
        
        const data = await response.json();
        expect(data.data).toBeTruthy();

        // Schema validation
        expect(
            validateUserSchema(data.data)
        ).toEqual([]);

        // TODO: Once Ticket#001 is resolved, update this to check entire object with newly created ID. Reduce dependency
        expect(data.data).toMatchObject(projectConstants.API.validUser);
    });

    const paginationScenarios = [
        { page: 1, per_page: 1, description: 'single user per page' },
        { page: 1, per_page: 2, description: 'two users per page' },
        { page: 2, per_page: 5, description: 'five page with three users' },
    ];

    paginationScenarios.forEach(({ page, per_page, description }) => {
        test(`should get users with pagination: ${description}`, async ({ request }) => {
            // TODO: Once Ticket#002 is resolved, send queries as option
            const response = await request.get(`${API_BASE}/users?page=${page}&per_page=${per_page}`,
                {headers: getApiHeaders({}) }
            );
            
            expect(response.status()).toBe(200);
            
            const data = await response.json();
            expect(data.data).toBeTruthy();

            expect(data.data.length).toBeLessThanOrEqual(per_page);
                        
        });
    });

    const errorScenarios = [
        // User ID errors
        {
            path: '99999',
            description: 'non-existent user ID',
            expectedStatus: 404
        },
        {
            path: 'abc',
            description: 'invalid user ID format',
            expectedStatus: 404
        },
        {
            path: `${undefined}`,
            description: 'undefined id',
            expectedStatus: 404
        },
    ];

    errorScenarios.forEach(({ path, description, expectedStatus }) => {
        test(`should handle error case: ${description}`, async ({ request }) => {
            const response = await request.get(`${API_BASE}/users/${path}`,
                {headers: getApiHeaders({}) }
            );
            
            expect(response.status()).toBe(expectedStatus);
        });
    });
});