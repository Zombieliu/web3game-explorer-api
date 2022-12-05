import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqListOwnerNFT extends BaseRequest {
    owner?: string,
    nonFungibleTokenId?: string,
    tokenId?: string,
    pageIndex?: number
    limit?: number,
}

export interface ResListOwnerNFT extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}