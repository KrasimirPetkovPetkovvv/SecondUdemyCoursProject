import {test,expect} from '@playwright/test'

test('Select Mine - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const checkBox = page.getByRole('checkbox', {name: "I agree to the site's "})
    await checkBox.check();
    await expect(checkBox).toBeChecked();

    await checkBox.uncheck();
    await expect(checkBox).not.toBeChecked();

});
test('Section action in sidebox - First Example', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const improvementInput = page.getByLabel('Areas for Improvement');

    await improvementInput.selectOption('content');
    await expect(improvementInput).toHaveValue('content');

    improvementInput.selectOption(['content', 'presentation']);
    await expect(improvementInput).toHaveValues(['content', 'presentation']);

    improvementInput.selectOption(['content', 'presentation', 'timing']);
    await expect(improvementInput).toHaveValues(['content', 'presentation', 'timing']);
})