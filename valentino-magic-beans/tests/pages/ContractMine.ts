import {expect, Page} from '@playwright/test';

export async function goToContact(page: Page) {

    await page.getByRole('button', {name : "Track Your Order"}).click()
    expect(page).toHaveURL(/.*contact/)
}
export async function fillOrderIdAndEmail(page: Page, orderId: string, email: string) {
    await page.locator('[data-test-id="contact-order-id-input"]').fill(orderId);
    await page.locator('[data-test-id="contact-email-input"]').fill(email);    
}
export async function clickTrackOrder(page: Page) {
    await page.locator('[data-test-id="contact-track-order-button"]').click();  
}