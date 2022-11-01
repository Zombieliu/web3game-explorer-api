import { ApiCall } from "tsrpc";
import { ReqBlock, ResBlock } from "../shared/protocols/PtlBlock";

export default async function (call: ApiCall<ReqBlock, ResBlock>) {
    // TODO
    call.error('API Not Implemented');
}