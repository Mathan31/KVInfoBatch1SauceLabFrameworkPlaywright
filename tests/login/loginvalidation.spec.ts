import { test } from '../../src/core/customFixtures';
import { ExpectUtil } from '../../src/utils/expectUtil';
import { LoginTestData } from '../../src/test-data/loginTestData';
import { WaitActions } from '../../src/wrapper/waitActions';
import { Constants } from '../../src/utils/constants';

 
test.describe('Login Validation Tests', () => { 
    test('Login with valid credentials and verify successful login', async ({ loginPage, inventoryPage, page }) => {
        const waitActions = new WaitActions(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(Constants.USERNAME, Constants.PASSWORD);
        await waitActions.waitForTimeout(2000);
        const isInInventoryPage = await inventoryPage.isUserInInventoryPage();
        await ExpectUtil.assertStringEquals(isInInventoryPage.toString(), "true", "User should be in inventory page after successful login");
    });

    test('Login with invalid credentials and verify error message', async ({ loginPage, page }) => {
        const waitActions = new WaitActions(page);
        await loginPage.navigateToLoginPage();
        await loginPage.login(LoginTestData.INVALID_USER.username, LoginTestData.INVALID_USER.password);
        const errorMessage = await loginPage.getErrorMessage();
        await waitActions.waitForTimeout(2000);
        await ExpectUtil.assertStringContains(errorMessage, "Username and password do not match any user in this service", "Error message should indicate invalid credentials");
    });
 
});
  
