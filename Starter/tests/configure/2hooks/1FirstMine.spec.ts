import {test,expect} from '@playwright/test'

test.beforeAll(async ()=>{
    console.log('Before all action')
});
test.beforeEach(async ()=>{
    console.log('Before each action')
});


test('Test 1', async ()=>{
    console.log('Test 1');
});
test('Test 2', async ()=>{
    console.log('Test 2');
});

test.afterEach(async ()=>{
    console.log('After each action')
});
test.afterAll(async ()=>{
    console.log('After all action')
});