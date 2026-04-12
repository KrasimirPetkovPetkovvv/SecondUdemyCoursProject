import {test, expect} from '@playwright/test'

test('Click actions - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const submitButton = page.getByRole('button', { name: 'Submit' })
    await submitButton.click()
})
test('Click action - right button - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const submitButton = page.getByRole('button', { name: 'Submit' })
    await submitButton.click({button: 'right', position: { x: 10, y: 10 }})
    await submitButton.click({button: 'middle', position: { x: 10, y: 10 }})

})
test('Click action - multiple selections with key down - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const improvementInput = page.getByLabel('Areas for Improvement');
    const firstOption = improvementInput.getByRole('option').first();
    const secondOption = improvementInput.getByRole('option').nth(1);
    const thirdOption = improvementInput.getByRole('option').nth(2);

    await firstOption.click();
    await expect(improvementInput).toHaveValue('content');

    await secondOption.click({modifiers: ['ControlOrMeta']});
    await expect(improvementInput).toHaveValues(['content', 'presentation']);

    await thirdOption.click({modifiers: ['ControlOrMeta']});
    await expect(improvementInput).toHaveValues(['content', 'presentation', 'timing']);


})