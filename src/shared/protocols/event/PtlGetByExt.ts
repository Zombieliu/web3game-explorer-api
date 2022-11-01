import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetByExt extends BaseRequest {
    blockNum: number
    extrinsicIndex: number
}

export interface ResGetByExt extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}