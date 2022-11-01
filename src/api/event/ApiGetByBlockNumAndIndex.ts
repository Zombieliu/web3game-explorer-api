import { ApiCall } from "tsrpc";
import { ReqGetByBlockNumAndIndex, ResGetByBlockNumAndIndex } from "../../shared/protocols/event/PtlGetByBlockNumAndIndex";

import { getCustomRepository } from "typeorm";

import { Event, EventRepository } from '../../entity/events';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetByBlockNumAndIndex, ResGetByBlockNumAndIndex>) {
    console.log("=================================== 1");

    let blockNum = call.req.blockNum;
    let eventIndex = call.req.eventIndex;
    console.log("=================================== 2");
    console.log(blockNum);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const event = await getCustomRepository(EventRepository).findOneByBlockNumAndIndex(blockNum, eventIndex);
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