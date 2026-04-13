import {expect } from "@playwright/test";
import { test } from "@playwright/test";

test("Cookies handling - First Example Test", async ({ page }) => {
    await page.goto('');
    await page.context().addCookies([
        {
            url: page.url(),
            name:'cookieConset',
            value:"Accepted",   
        }]);

    await page.reload();

    const cookieBanner = page.locator("#cookie-banner");
    await expect(cookieBanner).toBeHidden();
});