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
    let ret = await client.callApi('tokenNonFungible/ListOwnerNFT', {
        owner: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
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
