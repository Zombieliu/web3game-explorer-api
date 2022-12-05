import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetNonFunIdDetail extends BaseRequest {
    who?: string,
    nonFungibleTokenId?: string,
    pageIndex?: number
    limit?: number,
}

export interface ResGetNonFunIdDetail extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}