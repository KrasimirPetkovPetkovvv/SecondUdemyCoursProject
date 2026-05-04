import {test , Page , expect , Locator} from '@playwright/test';

export async function assertProduct(page: Page, heading: string) {

    const firstProductHeading = page.getByRole('heading', {name : heading})
    await expect(firstProductHeading).toBeVisible()

}
export async function getSubTotal(page: Page) {
    const subtotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subTotal = await subtotalWrapper.textContent()
    
    return Number(subTotal?.substring(1))
}
