import {test,expect} from '@playwright/test';

test('Chikld locators' , async ({page}) => {
    await page.goto('')

    const servicesList = page.getByRole('list').getByRole('listitem')
    const serviceItems = await servicesList.all();
    console.log(serviceItems.length)
    expect(serviceItems.length).toBeGreaterThan(0)

    // with css locators:
    const serviceItems2 = await page.locator('ul > li').all()
    for (const item of serviceItems2) {
        console.log(await item.textContent())
    }


})
test('Parent locators' , async ({page}) => {
    await page.goto('')

    const acceptCookiesButton = page.getByTestId('accept-cookies')
    const cookierBanner = acceptCookiesButton.locator('..')

    await acceptCookiesButton.click()
    await expect(cookierBanner).toBeHidden()
})
test('N-th element locator - buttons' , async ({page}) => {
    await page.goto('')
    
    const buttons = page.getByRole('button')
    const acceptCookiesButton = buttons.first()
    const rejectCookiesButton = buttons.last()

    await acceptCookiesButton.click()

    await expect(acceptCookiesButton).toBeHidden()
    await expect(rejectCookiesButton).toBeHidden()
})

test('N-th element locator - list items' , async ({page}) => {
    await page.goto('')

    const listItems = page.getByRole('listitem')
    const thirdItem = listItems.nth(2)

    console.log(await thirdItem.textContent())
})