import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqListTokenFungibleTransfer extends BaseRequest {
    blockNum?: string,
    eventIndex?: string,
    fromAccount?: string,
    toAccount?: string,
    fungibleTokenId?: string,
    pageIndex?: number
    limit?: number,
}

export interface ResListTokenFungibleTransfer extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}