import { ApiCall } from "tsrpc";
import { ReqGetAll, ResGetAll } from "../../shared/protocols/extrinsic/PtlGetAll";

export default async function (call: ApiCall<ReqGetAll, ResGetAll>) {
    // TODO
    call.error('API Not Implemented');
}