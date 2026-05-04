import {expect, Page,Locator} from '@playwright/test';

export async function CheckReturnedItem(page: Page, productName: string) {
    const returnedItemWrapper = page.getByText(productName)
    await expect(returnedItemWrapper).toBeVisible()
}