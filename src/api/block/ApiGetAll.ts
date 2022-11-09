import { ApiCall } from "tsrpc";
import { ReqGetAll, ResGetAll } from "../../shared/protocols/block/PtlGetAll";

import { getRepository, getCustomRepository } from 'typeorm';

import { Block, BlockRepository } from '../../entity/blocks';
import { EventRepository } from '../../entity/events';
import { ExtrinsicRepository } from '../../entity/extrinsics';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetAll, ResGetAll>) {
    console.log("=================================== 1");

    let pageIndex = call.req.pageIndex;
    let limit = call.req.limit;
    console.log("=================================== 2");
    console.log(pageIndex);
    console.log(limit);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const blocks = await getCustomRepository(BlockRepository).findManyAndCount(pageIndex, limit);
    console.log("=================================== 3");
    if (blocks == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(blocks)
        })
    }
}
