import { ApiCall } from "tsrpc";
import { ReqGetAll, ResGetAll } from "../../shared/protocols/extrinsic/PtlGetAll";

import { getCustomRepository } from "typeorm";

import { Extrinsic, ExtrinsicRepository } from '../../entity/extrinsics';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetAll, ResGetAll>) {
    console.log("=================================== 1");

    let blockNum = call.req.blockNum;
    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;
    console.log("=================================== 2");
    console.log(pageIndex);
    console.log(limit);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const event = await getCustomRepository(ExtrinsicRepository).findManyAndCount(blockNum, pageIndex, limit);
    console.log("=================================== 3");
    if (event == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(event)
        })
    }
}