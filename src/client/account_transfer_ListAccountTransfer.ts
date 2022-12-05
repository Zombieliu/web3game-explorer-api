import { HttpClient } from 'tsrpc';
import { serviceProto } from '../shared/protocols/serviceProto';

// Create the Client
let client = new HttpClient(serviceProto, {
    server: 'http://127.0.0.1:3002',
    json: true,
    // logger: console
});

async function test() {
    // callApi
    let ret = await client.callApi('account/GetBalanceTransfer', {
        fromAccount: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        toAccount: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        // pageIndex: 0,
        // limit: 3
    });
    if (ret.res != undefined) {
        console.log(JSON.parse(ret.res.content))
        console.log(ret.res.content)
    }
    // Error
    if (!ret.isSucc) {
        return;
    }

}
test()
