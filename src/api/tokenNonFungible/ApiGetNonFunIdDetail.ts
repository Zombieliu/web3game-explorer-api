import { ApiCall } from "tsrpc";
import { ReqGetNonFunIdDetail, ResGetNonFunIdDetail } from "../../shared/protocols/tokenNonFungible/PtlGetNonFunIdDetail";

import { getCustomRepository } from "typeorm";
import { TokenNonFungibleCreated, TokenNonFungibleCreatedRepository } from './../../entity/token_non_fungible/token_non_fungible_created';

import { DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetNonFunIdDetail, ResGetNonFunIdDetail>) {
    let who = call.req.who;
    let nonFungibleTokenId = call.req.nonFungibleTokenId;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;

    const tokenNonFungibleCreated = await getCustomRepository(TokenNonFungibleCreatedRepository).findManyAndCount(who, nonFungibleTokenId, pageIndex, limit);

    if (tokenNonFungibleCreated == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(tokenNonFungibleCreated)
        })
    }
}