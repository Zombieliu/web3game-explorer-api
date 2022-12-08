import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../../entity/blocks';
import { TokenMultiTransfer } from '../../entity/token_multi/token_multi_transfer';
import { Event } from '../../entity/events';
import { getRepository, getCustomRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";

export async function TokenMultiTransferScript(event: any, block: any, eventIdx: any, api?:any) {
  const {event: {section, method}} = event;

  if (section === 'tokenMulti' && method === 'Transferred') {
      const {event: {data: [multiTokenId, from, to, tokenIds, balances]}, phase} = event;

      const extIndex = phase.asApplyExtrinsic.toNumber();
      const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

      let tokenTransferEntity = new TokenMultiTransfer()

      tokenTransferEntity.blockNum = block.block.header.number.toString();
      tokenTransferEntity.eventIndex = eventIdx;
      tokenTransferEntity.extrinsicHash = block.block.extrinsics[extIndex].hash.toString();
      tokenTransferEntity.extrinsicIndex = extIndex;
      tokenTransferEntity.fromAccount = (from as AccountId).toString();
      tokenTransferEntity.toAccount = (to as AccountId).toString();
      tokenTransferEntity.multiTokenId = multiTokenId.toString();
      tokenTransferEntity.tokenIds = [tokenIds.toNumber()];
      tokenTransferEntity.balances = [balances.toNumber()];
      tokenTransferEntity.timestamp = new Date(moment.toNumber());

      console.debug(`${tokenTransferEntity.blockNum}-${tokenTransferEntity.eventIndex} TokenMulti(${tokenTransferEntity.fromAccount} transfer ${tokenTransferEntity.multiTokenId}-${tokenTransferEntity.tokenIds}-${tokenTransferEntity.balances} to ${tokenTransferEntity.toAccount}) success saved`)
      try {
        await getRepository(TokenMultiTransfer).insert(tokenTransferEntity);
      } catch (e) {
        await getRepository(TokenMultiTransfer).save(tokenTransferEntity);
      }
    } else if (section === 'tokenMulti' && method === 'BatchTransferred') {
      const {event: {data: [multiTokenId, from, to, tokenIds, balances]}, phase} = event;

      const extIndex = phase.asApplyExtrinsic.toNumber();
      const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

      let tokenTransferEntity = new TokenMultiTransfer()

      tokenTransferEntity.blockNum = block.block.header.number.toString();
      tokenTransferEntity.eventIndex = eventIdx;
      tokenTransferEntity.extrinsicHash = block.block.extrinsics[extIndex].hash.toString();
      tokenTransferEntity.extrinsicIndex = extIndex;
      tokenTransferEntity.fromAccount = (from as AccountId).toString();
      tokenTransferEntity.toAccount = (to as AccountId).toString();
      tokenTransferEntity.multiTokenId = multiTokenId.toString();
      tokenTransferEntity.tokenIds = tokenIds;
      tokenTransferEntity.balances = balances;
      tokenTransferEntity.timestamp = new Date(moment.toNumber());

      console.debug(`${tokenTransferEntity.blockNum}-${tokenTransferEntity.eventIndex} TokenMulti(${tokenTransferEntity.fromAccount} transfer ${tokenTransferEntity.multiTokenId}-${tokenTransferEntity.tokenIds}-${tokenTransferEntity.balances} to ${tokenTransferEntity.toAccount}) success saved`)
      try {
        await getRepository(TokenMultiTransfer).insert(tokenTransferEntity);
      } catch (e) {
        await getRepository(TokenMultiTransfer).save(tokenTransferEntity);
      }
    }

}
