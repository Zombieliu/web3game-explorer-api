import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../../entity/blocks';
import { TokenFungibleTransfer, TokenFungibleTransferRepository } from '../../entity/token_fungible/token_fungible_transfer';
import { Event } from '../../entity/events';
import { getRepository, getCustomRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";

export async function TokenFungibleTransferScript(event: any, block: any, eventIdx: any, api?:any) {
    const {event: {section, method}} = event;

    if (section === 'tokenFungible' && method === 'Transfer') {
      const {event: {data: [fungibleTokenId, from, to, balance]}, phase} = event;

      const extIndex = phase.asApplyExtrinsic.toNumber();
      const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

      let tokenTransferEntity = new TokenFungibleTransfer()

      tokenTransferEntity.blockNum = block.block.header.number.toString();
      tokenTransferEntity.eventIndex = eventIdx;
      tokenTransferEntity.extrinsicHash = block.block.extrinsics[extIndex].hash.toString();
      tokenTransferEntity.extrinsicIndex = extIndex;
      tokenTransferEntity.fromAccount = (from as AccountId).toString();
      tokenTransferEntity.toAccount = (to as AccountId).toString();
      tokenTransferEntity.fungibleTokenId = fungibleTokenId.toString();
      tokenTransferEntity.balance = balance.toString();
      tokenTransferEntity.timestamp = new Date(moment.toNumber());

      console.debug(`${tokenTransferEntity.blockNum}-${tokenTransferEntity.eventIndex} TokenFungible(${tokenTransferEntity.fromAccount} transfer ${tokenTransferEntity.fungibleTokenId} to ${tokenTransferEntity.toAccount}) success saved`)
      try {
        await getRepository(TokenFungibleTransfer).insert(tokenTransferEntity);
      } catch (e) {
        await getRepository(TokenFungibleTransfer).save(tokenTransferEntity);
      }
    }
}
