/**
 * Sets up a test page with localStorage data and navigates to specified URL
 * @param {Page} page - Playwright page object
 * @param {string} url - URL to navigate to
 * @param {Object} localStorageData - Data to inject into localStorage
 * @param {string} localStorageKey - Key for localStorage (e.g., 'react-todos')
 * @returns {Promise<void>}
 */
export async function setupPageWithData({ page, url = '/', localStorageData, localStorageKey = 'react-todos', reload = false }) {
    // Navigate to page
    await page.goto(url)

    // Set localStorage
    await page.evaluate((params) => {
        window.localStorage.setItem(params.key, JSON.stringify(params.data));
    }, { key: localStorageKey, data: localStorageData});

    // Reload page
    if(reload){

        await page.reload();
    }

}