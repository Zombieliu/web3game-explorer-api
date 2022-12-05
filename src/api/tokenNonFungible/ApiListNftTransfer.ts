import { ApiCall } from "tsrpc";
import { ReqListNftTransfer, ResListNftTransfer } from "../../shared/protocols/tokenNonFungible/PtlListNftTransfer";

import { getCustomRepository } from "typeorm";
import { TokenNonFungibleTransfer, TokenNonFungibleTransferRepository } from './../../entity/token_non_fungible/token_non_fungible_transfer';

import { DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqListNftTransfer, ResListNftTransfer>) {
    let blockNum = call.req.blockNum;
    let eventIndex = call.req.eventIndex;
    let fromAccount = call.req.fromAccount;
    let toAccount = call.req.toAccount;
    let nonFungibleTokenId = call.req.nonFungibleTokenId;
    let tokenId = call.req.tokenId;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;

    const tokenNonFungibleTransfer = await getCustomRepository(TokenNonFungibleTransferRepository).findManyAndCount(blockNum, eventIndex, fromAccount, toAccount, nonFungibleTokenId, tokenId, pageIndex, limit);

    if (tokenNonFungibleTransfer == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(tokenNonFungibleTransfer)
        })
    }
}