import {test,expect } from '@playwright/test';

test('Fill actions - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const nameField = page.getByRole('textbox',{name: 'Name (required)'})
    await nameField.fill('krasimir')
    await nameField.fill('Alex')  

    // type action is deprecated
    await nameField.type('John')  // type action is deprecated

    await nameField.press('A')


})
test('Key actions - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const nameField = page.getByRole('textbox',{name: 'Name (required)'})
    await nameField.fill('krasimir')
    await page.keyboard.down('Escape')

    await expect(nameField).toBeEmpty()
})