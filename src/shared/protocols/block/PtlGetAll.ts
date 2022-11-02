import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetAll extends BaseRequest {
    pageIndex: number
    limit?: number
}

export interface ResGetAll extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}