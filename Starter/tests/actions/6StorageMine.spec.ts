import {expect, test} from '@playwright/test';

test('Storage handling - First Example Test', async ({ page }) => {
    await page.goto('Feedbackform.html');
    const name:string = 'Krasimir';
    
    const nameFiled = page.getByRole('textbox', { name: 'Name' });
    await nameFiled.fill(name);

    await page.getByRole('button', {name: 'Save Progress'}).click();


    await page.reload();

    await expect(nameFiled).toHaveValue(name);
});