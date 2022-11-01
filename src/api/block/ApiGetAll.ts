// import { ApiCall } from "tsrpc";
// import { ReqGetAll, ResGetAll } from "../../shared/protocols/block/PtlGetAll";

// import { getRepository, getCustomRepository } from 'typeorm';

// import { Block, BlockRepository } from '../../entity/blocks';
// import {DataResult, PageQueries } from '../../common';

// export default async function (call: ApiCall<ReqGetAll, ResGetAll>) {

//     console.log("=================================== 2");

//     const [blocks, totalBlock] = await getRepository(Block).findManyAndCount({});

//             const blocks = await AppDataSource.manager.getRepository(Block)
//             .createQueryBuilder('current_coin_balances')
//             .where('current_coin_balances.coin_type_hash = :coin_type_hash', {coin_type_hash})
//             .getMany()
            
//             console.log("=================================== 3");
//             if (blocks == undefined) {
//                 call.succ({
//                     content: ""
//                 })
//             } else {
//                 call.succ({
//                     content: JSON.stringify(blocks)
//                 })
//             }
        
//         }).catch(error => console.log(error));
//     }else {
//         type Queries = {
//             blockNum?: number;
//             extrinsicIndex?: number;
//             extrinsicHash?: string;
//             module?: string;
//             event?: string;
//             fromTime?: number;
//             toTime?: number;
//             page?: number;
//             pageSize?: number;
//           };


//     const [blockNum, blockNumExist] = getNum(ctx.query.blockNum);
//     if (blockNumExist && _.isUndefined(blockNum)) {
//       ctx.body = ResponseBody.invalidParam('blockNum');
//       return;
//     }

//     const [extrinsicIndex, extrinsicIndexExist] = getNum(ctx.query.extrinsicIndex);
//     if (extrinsicIndexExist && _.isUndefined(extrinsicIndex)) {
//       ctx.body = ResponseBody.invalidParam('extrinsicIndex');
//       return;
//     }

//     const [extrinsicHash, extrinsicHashExist] = getHash(ctx.query.extrinsicHash);
//     if (extrinsicHashExist && _.isUndefined(extrinsicHash)) {
//       ctx.body = ResponseBody.invalidParam('extrinsicHash');
//       return;
//     }

//     const module = getFirstParam(ctx.query.module);
//     const event = getFirstParam(ctx.query.event);

//     const [fromTime, toTime] = getTimeRange(ctx);
//     if (fromTime && toTime && fromTime > toTime) {
//       ctx.body = ResponseBody.invalidParam('fromTime must <= toTime');
//       return;
//     }

//     const [page, pageSize] = getPageAndSize(ctx);



//         type filiter = {
//             blockNum,
//             extrinsicIndex,
//             extrinsicHash,
//             module,
//             event,
//             fromTime,
//             toTime,
//             offset: (page - 1) * pageSize,
//             limit: pageSize,
//           }
//         const filter = Partial<
//         {
//           blockNum: number;
//           extrinsicIndex: number;
//           extrinsicHash: string;
//           module: string;
//           event: string;
//           fromTime: number;
//           toTime: number;
//         } & PageQueries
//       >,
//         const [blocks, totalCount] = await AppDataSource.manager.getCustomRepository(BlockRepository).findManyAndCount();

//         console.log("=================================== 2");

//         if (blocks == undefined) {
//             call.succ({
//                 content: ""
//             })
//         } else {
//             call.succ({
//                 content: JSON.stringify(blocks)
//             })
//         }
//     }
    
// }
