import {test, expect} from '@playwright/test';

test('Get by Text practice - FeedBack Form', async ({page}) => {
    await page.goto('FeedbackForm.html');

    const title = page.getByText('Feedback Form').first();
    await expect(title).toBeVisible();
});
test('Get by Text practice - error message validation', async ({page}) => {
    await page.goto('FeedbackForm.html');

    const emailValidationError = page.getByText('Invalid email format');
    await expect(emailValidationError).toBeHidden();

    await page.getByRole('textbox', {name: 'Email'}).fill('test@test');
    await expect(emailValidationError).toBeVisible();
});
test('Get by text practice - hidden element', async ({page}) => {
    await page.goto('FeedbackForm.html');

    const hiddenTextButton = page.getByText('Hidden feature');
    await expect(hiddenTextButton).toBeHidden();

    const extractTextFromHiddenButton = await hiddenTextButton.textContent();
    console.log(extractTextFromHiddenButton);

    
    /// attempt to click on the hidden button and expect it to be hidden and failed as expected
    // const hiddenWithRole = page.getByRole('button', {name: 'Hidden feature'});
    // const hiddenButtonTextByRole = await hiddenWithRole.textContent();
    // console.log(hiddenButtonTextByRole);
    // await expect(hiddenWithRole).toBeHidden();
});
