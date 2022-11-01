import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetByBlock extends BaseRequest {
    numOrHash: number | string
}

export interface ResGetByBlock extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}