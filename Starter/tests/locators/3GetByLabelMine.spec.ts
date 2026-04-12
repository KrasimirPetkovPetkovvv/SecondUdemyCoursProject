import {test , expect} from '@playwright/test';

test('Get by label practice - inisde forms  ', async ({page}) => {
    await page.goto('FeedBackForm.html')

    const name = page.getByLabel('name')
    await name.fill('Krasimir');

    const email = page.getByLabel('email')
    await email.fill('krasimir@petkov.bg');

    await page.pause();
    
});