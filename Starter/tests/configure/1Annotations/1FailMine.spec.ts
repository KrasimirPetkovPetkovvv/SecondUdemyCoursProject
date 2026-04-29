import {test,expect} from '@playwright/test'

test.fail('Failing test - 1', async()=>{
    expect(false).toBeTruthy()
});

function getFlightData(flightID: string) {
    //throw new Error('Not implemented yet');
    return {
        data : flightID
    }
}

test('GetFlightData test',async()=>{
const flightData = getFlightData('1');
expect(flightData).toBeDefined();

}  );