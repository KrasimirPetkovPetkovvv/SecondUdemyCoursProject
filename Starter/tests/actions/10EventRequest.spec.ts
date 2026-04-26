import {test, expect,Request} from '@playwright/test';

test.use({


});
test('Monitor request from inside a page - playwright.dev', async ({page}) => {
    page.on('request',addRequest);
        
    const requests: Request[] = []

      function addRequest(request: Request) {
        requests.push(request);
      }

    await page.goto('https://playwright.dev/');
    requests.forEach(request => {
        console.log(request.url());
    });
});

test.fail('check for failed request - example.com', async ({page}) => {
    page.on('requestfailed', request => {
        expect(request
            ,`failed request to ${request.url()} with error ${request.failure()?.errorText} `
        ).toBeUndefined();
    });
    const requestButton = page.getByRole('button', {name: 'Call wrong server'});
    await page.goto('https://localhost:5005/Events.html');
    await requestButton.click();
    await page.waitForTimeout(1000);
});