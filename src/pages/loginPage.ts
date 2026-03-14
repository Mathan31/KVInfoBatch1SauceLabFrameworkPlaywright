import { Page, Locator } from "@playwright/test";
import { BasePage } from "../core/basePage";
import { UIActions } from '../actions/uiActions'
import { Constants } from '../utils/constants';
 

export class LoginPage extends BasePage{

 //private page: Page;
 private usernameInput: Locator;
 private passwordInput: Locator;
 private loginButton: Locator;
 private errorMessage: Locator;
 private uiActions: UIActions;

 constructor(page: Page) {
  super(page);
  this.page = page;
  this.uiActions = new UIActions(page);
  this.usernameInput = page.locator("#user-name");
  this.passwordInput = page.locator("#password");
  this.loginButton = page.locator("#login-button");
  this.errorMessage = page.locator("[data-test='error']");
 }

 async navigateToLoginPage() {
    await this.uiActions.navigateTo(Constants.BASE_URL);
 }

 async enterUsername(username: string) {
    await this.uiActions.fill(this.usernameInput, username);
 }

 async enterPassword(password: string) {
  await this.uiActions.fill(this.passwordInput, password);
 }

 async clickLogin() {
  await this.uiActions.click(this.loginButton);
 }

 async login(username: string, password: string) {
  await this.enterUsername(username);
  await this.enterPassword(password);
  await this.clickLogin();
 }

 async getErrorMessage() {
  return await this.uiActions.getText(this.errorMessage);
 }
}