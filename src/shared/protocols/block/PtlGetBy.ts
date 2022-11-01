import { BaseRequest, BaseResponse, BaseConf } from "../base";

export interface ReqGetBy extends BaseRequest {
    numOrHash: number | string
}

export interface ResGetBy extends BaseResponse {
    content: string    
}

export const conf: BaseConf = {
    
}