import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../../entity/blocks';
import { AccountTransfer } from '../../entity/balance/balance_transfer';
import { Event } from '../../entity/events';
import { getRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";
import { TokenFungibleTransfer, TokenFungibleTransferRepository } from '../../entity/token_fungible/token_fungible_transfer';

export async function AccountTransferScript(event: any, block: any, eventIdx: any, api?:any) {
  const {event: {data: [from, to, amount], section, method}, phase} = event;
  if (section === 'balances' && method === 'Transfer') {
    const extIndex = phase.asApplyExtrinsic.toNumber();
    const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

    let accTranEntity = new AccountTransfer()

    accTranEntity.blockNum = block.block.header.number.toString();
    accTranEntity.eventIndex = eventIdx;
    accTranEntity.extrinsicHash = block.block.extrinsics[extIndex].hash.toString();
    accTranEntity.extrinsicIndex = extIndex;
    accTranEntity.fromAccount = (from as AccountId).toString();
    accTranEntity.toAccount = (to as AccountId).toString();
    accTranEntity.balance = (amount as Balance).toString();
    accTranEntity.timestamp = new Date(moment.toNumber());
    console.debug(`${accTranEntity.blockNum}-${accTranEntity.eventIndex} AccountTransfer(${accTranEntity.fromAccount}, ${accTranEntity.toAccount}, ${accTranEntity.balance}) success saved`)
    try {
      await getRepository(AccountTransfer).insert(accTranEntity);
    } catch (e) {
      await getRepository(AccountTransfer).save(accTranEntity);
    }
    let tokenTransferEntity = new TokenFungibleTransfer()

    tokenTransferEntity.blockNum = block.block.header.number.toString();
    tokenTransferEntity.eventIndex = eventIdx;
    tokenTransferEntity.extrinsicHash = block.block.extrinsics[extIndex].hash.toString();
    tokenTransferEntity.extrinsicIndex = extIndex;
    tokenTransferEntity.fromAccount = (from as AccountId).toString();
    tokenTransferEntity.toAccount = (to as AccountId).toString();
    tokenTransferEntity.fungibleTokenId = "-1";
    tokenTransferEntity.balance = (amount as Balance).toString();;
    tokenTransferEntity.timestamp = new Date(moment.toNumber());

    console.debug(`${tokenTransferEntity.blockNum}-${tokenTransferEntity.eventIndex} TokenFungible(${tokenTransferEntity.fromAccount} transfer ${tokenTransferEntity.fungibleTokenId} to ${tokenTransferEntity.toAccount}) success saved`)
    try {
      await getRepository(TokenFungibleTransfer).insert(tokenTransferEntity);
    } catch (e) {
      await getRepository(TokenFungibleTransfer).save(tokenTransferEntity);
    }
  }
}
