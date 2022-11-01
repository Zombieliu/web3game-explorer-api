import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetByBlockNumAndIndex extends BaseRequest {
    blockNum: number
    extrinsicIndex: number
}

export interface ResGetByBlockNumAndIndex extends BaseResponse {
    content: string
}

export const conf: BaseConf = {
    
}