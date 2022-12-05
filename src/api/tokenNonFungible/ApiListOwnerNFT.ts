import { ApiCall } from "tsrpc";
import { ReqListOwnerNFT, ResListOwnerNFT } from "../../shared/protocols/tokenNonFungible/PtlListOwnerNFT";

import { getCustomRepository } from "typeorm";
import { TokenNonFungible, TokenNonFungibleRepository } from './../../entity/token_non_fungible/token_non_fungible';

import { DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqListOwnerNFT, ResListOwnerNFT>) {
    let owner = call.req.owner;
    let nonFungibleTokenId = call.req.nonFungibleTokenId;
    let tokenId = call.req.tokenId;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;

    const tokenNonFungible = await getCustomRepository(TokenNonFungibleRepository).findManyAndCount(owner, nonFungibleTokenId, tokenId, pageIndex, limit);

    if (tokenNonFungible == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(tokenNonFungible)
        })
    }
}