import { ApiCall } from "tsrpc";
import { ReqListTokenFungibleTransfer, ResListTokenFungibleTransfer } from "../../shared/protocols/tokenFungible/PtlListTokenFungibleTransfer";

import { getCustomRepository } from "typeorm";
import { TokenFungibleTransferRepository } from './../../entity/token_fungible/token_fungible_transfer';

export default async function (call: ApiCall<ReqListTokenFungibleTransfer, ResListTokenFungibleTransfer>) {
    let blockNum = call.req.blockNum;
    let eventIndex = call.req.eventIndex;
    let fromAccount = call.req.fromAccount;
    let toAccount = call.req.toAccount;
    let fungibleTokenId = call.req.fungibleTokenId;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;

    const tokenMultiTransfer = await getCustomRepository(TokenFungibleTransferRepository).findManyAndCount(blockNum, eventIndex, fungibleTokenId, fromAccount, toAccount, pageIndex, limit);

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