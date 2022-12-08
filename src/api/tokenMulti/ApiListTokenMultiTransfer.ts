import { ApiCall } from "tsrpc";
import { ReqListTokenMultiTransfer, ResListTokenMultiTransfer } from "../../shared/protocols/tokenMulti/PtlListTokenMultiTransfer";

import { getCustomRepository } from "typeorm";
import { TokenMultiTransferRepository } from './../../entity/token_multi/token_multi_transfer';

export default async function (call: ApiCall<ReqListTokenMultiTransfer, ResListTokenMultiTransfer>) {
    let blockNum = call.req.blockNum;
    let eventIndex = call.req.eventIndex;
    let fromAccount = call.req.fromAccount;
    let toAccount = call.req.toAccount;
    let multiTokenId = call.req.multiTokenId;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;

    const tokenMultiTransfer = await getCustomRepository(TokenMultiTransferRepository).findManyAndCount(blockNum, eventIndex, multiTokenId, fromAccount, toAccount, pageIndex, limit);

    if (tokenMultiTransfer == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(tokenMultiTransfer)
        })
    }
}