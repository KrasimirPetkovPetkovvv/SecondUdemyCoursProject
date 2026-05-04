import {test, expect} from '@playwright/test';
import * as product from '../pages/ProductsMine';
import * as cart from '../pages/CartMine';
test('Item is added to the mine shopping cart', async ({ page }) => {
    await page.goto('/products');

    const firstProductWrapper = page.locator('.p-6').first()
    const firstProductName = await firstProductWrapper.getByRole('heading').first().textContent()
    const firstProductPrice = await firstProductWrapper.locator('.font-bold').textContent()
    const firstButton = firstProductWrapper.getByRole('button', { name: 'Add to cart'})
    await firstButton.click()
    // const addedProduct = await product.addToProductToCart(page, 1)

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click()

    // await cart.assertProduct(page, addedProduct.productName!)

    // const subTotal = await cart.getSubTotal(page)

    // expect(subTotal).toEqual(addedProduct.productPrice)

    const firstProductHeading = page.getByRole('heading', {name : firstProductName!})
    await expect(firstProductHeading).toBeVisible()

    const subtotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    const subTotal = await subtotalWrapper.textContent()
    const expectedSubTotal = Number(subTotal?.substring(1))
    const actualSubTotal = Number(firstProductPrice?.substring(1))

    expect(expectedSubTotal).toEqual(actualSubTotal)

    console.log( firstProductName)
    console.log(firstProductPrice)
});