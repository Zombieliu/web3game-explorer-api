import { ApiCall } from "tsrpc";
import { ReqGetByExtHash, ResGetByExtHash } from "../../shared/protocols/extrinsic/PtlGetByExtHash";

import { getCustomRepository } from "typeorm";

import { Extrinsic, ExtrinsicRepository } from '../../entity/extrinsics';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetByExtHash, ResGetByExtHash>) {
    console.log("=================================== 1");

    let extrinsicHash = call.req.extrinsicHash;
    console.log("=================================== 2");
    console.log(extrinsicHash);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const event = await getCustomRepository(ExtrinsicRepository).findOneByExtHash(extrinsicHash);
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