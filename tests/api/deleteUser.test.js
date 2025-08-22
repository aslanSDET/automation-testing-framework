import { test, expect } from '@playwright/test';
import { getApiHeaders } from '../../utils/helpers.js';
import projectConstants from '../data/constants.js'

const API_BASE = process.env.API_BASE_URL
const key = process.env.ALLACCESS_API_KEY

// TODO: No DB has been built. Once DB is established, set up beforeEach and create resource for each test to delete
test.describe('DELETE /users/{id} - Delete User Tests', () => {

    test('should delete user with valid ID', async ({ request }) => {
        // Use existing valid user from constants
        const userId = projectConstants.API.validUser.id;

        const deleteResponse = await request.delete(`${API_BASE}/users/${userId}`, {
            headers: getApiHeaders({key})
        });

        expect(deleteResponse.status()).toBe(204);

        // TODO: Once DB is established, verify it is deleted from DB
    });

    // TODO: APP does not throw any error for non-existent User Id
    test.skip('should handle non-existent user ID', async ({ request }) => {
        const response = await request.delete(`${API_BASE}/users/99999`, {
            headers: getApiHeaders({key})
        });

        // Should return 404 for non-existent user
        expect(response.status()).toBe(404);
    });

    // TODO: APP does not throw any error for malformed/wrong formatted user ID
    test.skip('should handle malformed user ID', async ({ request }) => {
        const response = await request.delete(`${API_BASE}/users/abc`, {
            headers: getApiHeaders({key})
        });

        // Should return 404 for invalid ID format
        expect(response.status()).toBe(500);
    });


    test('should require authentication (API key)', async ({ request }) => {
        // Test without API key
        const responseWithoutKey = await request.delete(`${API_BASE}/users/1`);

        // Should fail without API key
        expect(responseWithoutKey.status()).toBe(401);
    });

    // TODO: APP does not throw any error missing ID value
    test.skip('should handle missing value', async ({ request }) => {
        const response = await request.delete(`${API_BASE}/users/`, {
            headers: getApiHeaders({key})
        });

        // Should return 404 for negative ID
        expect(response.status()).toBe(404);
    });

    // TODO: Defect: Application allows read-only user to delete resource
    test.skip('should not allow read-only user to create resource', async ({ request }) => {
        // Test with Read-Only API key
        const responseWithReadKey = await request.delete(`${API_BASE}/users/`, {
            headers: getApiHeaders({})
        });

        // Should fail without API key
        expect(responseWithReadKey.status()).toBe(401);
    });
});
