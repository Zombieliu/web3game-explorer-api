import { ApiCall } from "tsrpc";
import { ReqGetBy, ResGetBy } from "../../shared/protocols/block/PtlGetBy";

import { getCustomRepository } from "typeorm";


import { Block, BlockRepository } from '../../entity/blocks';
import {DataResult, PageQueries } from '../../common';

export default async function (call: ApiCall<ReqGetBy, ResGetBy>) {
    console.log("=================================== 1");

    let numOrHash = call.req.numOrHash;
    console.log("=================================== 2");
    console.log(numOrHash);
    // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    const block = await getCustomRepository(BlockRepository).findOneBy(numOrHash);
    console.log("=================================== 3");
    if (block == undefined) {
        call.succ({
            content: ""
        })
    } else {
        call.succ({
            content: JSON.stringify(block)
        })
    }

    // if (!AppDataSource.isInitialized){
    //     AppDataSource.initialize().then(async () => {

    //         // const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);
    //         const block = await getCustomRepository(BlockRepository).findOneByNum(blockNum);
    //         console.log("=================================== 3");
    //         if (block == undefined) {
    //             call.succ({
    //                 content: ""
    //             })
    //         } else {
    //             call.succ({
    //                 content: JSON.stringify(block)
    //             })
    //         }
        
    //     }).catch(error => console.log(error));
    // }else {
    //     const block = await AppDataSource.manager.getCustomRepository(BlockRepository).findOneByNum(blockNum);

    //     console.log("=================================== 2");

    //     if (block == undefined) {
    //         call.succ({
    //             content: ""
    //         })
    //     } else {
    //         call.succ({
    //             content: JSON.stringify(block)
    //         })
    //     }
    // }
    
}
