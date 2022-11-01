import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetByExtHash extends BaseRequest {
    extrinsicHash: string
}

export interface ResGetByExtHash extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}