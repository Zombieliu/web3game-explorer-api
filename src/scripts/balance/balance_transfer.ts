import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../../entity/blocks';
import { AccountTransfer } from '../../entity/balance/balance_transfer';
import { Event } from '../../entity/events';
import { getRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";

export async function AccountTransferScript(event: any, block: any, eventIdx: any, api?:any) {
  const {event: {data: [from, to, amount], section, method}, phase} = event;
  if (section === 'balances' && method === 'Transfer') {
    const extIndex = phase.asApplyExtrinsic.toNumber();
    const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

    let accTranEntity = new AccountTransfer()

    accTranEntity.blockNum = block.block.header.number.toString();
    accTranEntity.eventIndex = eventIdx;
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
  }
}
