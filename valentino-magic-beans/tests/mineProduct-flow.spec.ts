import {test, expect} from '@playwright/test';
import * as product from './pages/ProductsMine';
import * as cart from './pages/CartMine';
import * as checkout from './pages/CheckOutMine';
import * as contact from './pages/ContractMine';
import * as checkoutReturnedItem from './pages/CheckOutReturnedItemMine';
test('Item is added to the mine shopping cart', async ({ page }) => {
    await page.goto('/products');

    // const firstProductWrapper = page.locator('.p-6').first()
    // const firstProductName = await firstProductWrapper.getByRole('heading').first().textContent()
    // const firstProductPrice = await firstProductWrapper.locator('.font-bold').textContent()
    // const firstButton = firstProductWrapper.getByRole('button', { name: 'Add to cart'})
    // await firstButton.click()
    const addedProduct = await product.addToProductToCart(page, 1)

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click()

    await cart.assertProduct(page, addedProduct.productName!)

    const subTotal = await cart.getSubTotal(page)

    expect(subTotal).toEqual(addedProduct.productPrice)

    // const firstProductHeading = page.getByRole('heading', {name : firstProductName!})
    // await expect(firstProductHeading).toBeVisible()

    // const subtotalWrapper = page.getByText('Subtotal').locator('..').locator('.font-semibold');
    // const subTotal = await subtotalWrapper.textContent()
    // const expectedSubTotal = Number(subTotal?.substring(1))
    // const actualSubTotal = Number(firstProductPrice?.substring(1))

    // expect(expectedSubTotal).toEqual(actualSubTotal)

    // console.log( firstProductName)
    // console.log(firstProductPrice)
});
test('Complete the workflow of adding an item to the cart and then removing it', async ({ page }) => {
        await page.goto('/products');

    const addedProduct = await product.addToProductToCart(page, 1)

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click()

    await cart.assertProduct(page, addedProduct.productName!)

    const subTotal = await cart.getSubTotal(page)

    expect(subTotal).toEqual(addedProduct.productPrice)

    await page.getByRole('button', {name : 'Proceed to Checkout'}).click()

    await checkout.addContactInfo(page)
    await checkout.addPaymentInfo(page)
    await checkout.addShippingAddress(page)
    await checkout.placeOrder(page)


    //get order ID;
    const orderWrapper = page.getByText('Your Order ID is:').locator('..')
    const orderId = await orderWrapper.getByRole('paragraph').nth(1).textContent()

    await contact.goToContact(page)

    await contact.fillOrderIdAndEmail(page, orderId!,checkout.testValues.email
    )
    await contact.clickTrackOrder(page)


    await checkoutReturnedItem.CheckReturnedItem(page, addedProduct.productName!)

})