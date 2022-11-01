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
    let ret = await client.callApi('block/GetBy', {
        numOrHash: "0x15a1e1b951337cf959bbc0a515d29102c1986d1679ffaa2a8d6a1b22bf3a6b63"
    });
    if (ret.res != undefined) {
        console.log(JSON.parse(ret.res.content))
    }
    // Error
    if (!ret.isSucc) {
        return;
    }

}
test()
