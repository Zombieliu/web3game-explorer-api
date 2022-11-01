import { ApiCall } from "tsrpc";
import { ReqGetByBlock, ResGetByBlock } from "../../shared/protocols/event/PtlGetByBlock";

import { getCustomRepository } from "typeorm";

import { Event, EventRepository } from '../../entity/events';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetByBlock, ResGetByBlock>) {
    console.log("=================================== 1");

    let numOrHash = call.req.numOrHash;

    console.log("=================================== 2");
    console.log(numOrHash);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const event = await getCustomRepository(EventRepository).findManyByBlock(numOrHash);
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