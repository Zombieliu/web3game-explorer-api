import { ApiCall } from "tsrpc";
import { ReqEvent, ResEvent } from "../shared/protocols/PtlEvent";

export default async function (call: ApiCall<ReqEvent, ResEvent>) {
    // TODO
    call.error('API Not Implemented');
}