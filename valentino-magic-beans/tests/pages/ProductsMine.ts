import {Page,expect} from '@playwright/test';

export async function addToProductToCart(page: Page, index: number) {
     const productWrapper = page.locator('.p-6').nth(index)
    const productName = await productWrapper.getByRole('heading').first().textContent()
    const productPrice = await productWrapper.locator('.font-bold').textContent()
    const buttonAdding = productWrapper.getByRole('button', { name: 'Add to cart'})
    await buttonAdding.click()

    return{
        productName,
        productPrice : Number(productPrice?.substring(1))
    }
};