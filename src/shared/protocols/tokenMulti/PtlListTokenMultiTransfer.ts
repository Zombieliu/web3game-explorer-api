import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqListTokenMultiTransfer extends BaseRequest {
    blockNum?: string,
    eventIndex?: string,
    fromAccount?: string,
    toAccount?: string,
    multiTokenId?: string,
    pageIndex?: number
    limit?: number,
}

export interface ResListTokenMultiTransfer extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}