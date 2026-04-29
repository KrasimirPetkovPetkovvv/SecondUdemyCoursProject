import {test, expect} from '@playwright/test'

test.skip('Testing for an unfinished test', async()=>{


});

test.fixme('Fix faulty test', async()=>{
    console.log('This test will not be run until the issue is resolved');
});

test('Mobile features test', async({page, isMobile})=>{
    test.skip(isMobile == false,'This test is for mobile browser only');
    
});
