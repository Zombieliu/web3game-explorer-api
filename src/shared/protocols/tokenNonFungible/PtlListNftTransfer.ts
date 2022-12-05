import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqListNftTransfer extends BaseRequest {
    blockNum?: string,
    eventIndex?: string,
    fromAccount?: string,
    toAccount?: string,
    nonFungibleTokenId?: string,
    tokenId?: string,
    pageIndex?: number
    limit?: number,
}

export interface ResListNftTransfer extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}