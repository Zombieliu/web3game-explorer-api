import { ApiCall } from "tsrpc";
import { ReqGetByBlockNumAndIndex, ResGetByBlockNumAndIndex } from "../../shared/protocols/extrinsic/PtlGetByBlockNumAndIndex";

import { getCustomRepository } from "typeorm";

import { Extrinsic, ExtrinsicRepository } from '../../entity/extrinsics';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetByBlockNumAndIndex, ResGetByBlockNumAndIndex>) {
    console.log("=================================== 1");

    let blockNum = call.req.blockNum;
    let extrinsicIndex = call.req.extrinsicIndex;
    console.log("=================================== 2");
    console.log(blockNum);
    console.log(extrinsicIndex);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const event = await getCustomRepository(ExtrinsicRepository).findOneByBlockNumAndIndex(blockNum, extrinsicIndex);
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