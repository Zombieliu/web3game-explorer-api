import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetBalanceTransfer extends BaseRequest {
    blockNum?: string,
    eventIndex?: string,
    fromAccount?: string,
    toAccount?: string,
    pageIndex?: number,
    limit?: number,
}

export interface ResGetBalanceTransfer extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}