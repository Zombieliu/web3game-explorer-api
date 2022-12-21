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
    let ret = await client.callApi('tokenFungible/ListTokenFungibleTransfer', {
        fromAccount: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        toAccount: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        // pageIndex: 0,
        // limit: 3
    });
    if (ret.res != undefined) {
        // console.log()

        // console.log(ret.res.content)
        JSON.parse(ret.res.content).items.map((item: any) => {
            console.log(item)
        })
    }
    // Error
    if (!ret.isSucc) {
        return;
    }

}
test()
