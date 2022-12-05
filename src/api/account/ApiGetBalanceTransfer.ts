import { ApiCall } from "tsrpc";
import { ReqGetBalanceTransfer, ResGetBalanceTransfer } from "../../shared/protocols/account/PtlGetBalanceTransfer";

import { getCustomRepository } from "typeorm";
import { AccountTransfer, AccountTransferRepository } from './../../entity/balance/balance_transfer';

import { DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetBalanceTransfer, ResGetBalanceTransfer>) {
    let blockNum = call.req.blockNum;
    let eventIndex = call.req.eventIndex;
    let fromAccount = call.req.fromAccount;
    let toAccount = call.req.toAccount;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;

    const tokenNonFungibleTransfer = await getCustomRepository(AccountTransferRepository).findManyAndCount(blockNum, eventIndex, fromAccount, toAccount, pageIndex, limit);

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