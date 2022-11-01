import { ApiCall } from "tsrpc";
import { ReqGetByExt, ResGetByExt } from "../../shared/protocols/event/PtlGetByExt";

import { getCustomRepository } from "typeorm";

import { Event, EventRepository } from '../../entity/events';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetByExt, ResGetByExt>) {
    console.log("=================================== 1");

    let blockNum = call.req.blockNum;
    let extrinsicIndex = call.req.extrinsicIndex;

    console.log("=================================== 2");
    console.log(blockNum);
    console.log(extrinsicIndex);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const event = await getCustomRepository(EventRepository).findOneByBlockNumAndIndex(blockNum, extrinsicIndex);
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