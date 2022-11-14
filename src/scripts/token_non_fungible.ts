import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../entity/blocks';
import { TokenNonFungible } from '../entity/token_non_fungible';
import { Event } from '../entity/events';
import { getRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";

export async function TokenNonFungibleScript(event: any, block: any, api?:any) {
    const {event: {data: [tokenId, account, name, symbol, base_uri], section, method}, phase, idx} = event;

    if (section === 'tokenNonFungible' && method === 'TokenCreated') {
        const extIndex = phase.asApplyExtrinsic.toNumber();
        const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

        let tokenNonEntity = new TokenNonFungible()

        tokenNonEntity.blockNum = block.block.header.number.toNumber();
        tokenNonEntity.eventIndex = idx;
        tokenNonEntity.extrinsicIndex = extIndex;
        tokenNonEntity.tokenId = tokenId.toString();
        tokenNonEntity.account = (account as AccountId).toString();
        tokenNonEntity.name = name;
        tokenNonEntity.symbol = symbol;
        tokenNonEntity.base_uri = base_uri;
        tokenNonEntity.timestamp = new Date(moment.toNumber());
        console.debug(`${tokenNonEntity.blockNum}-${tokenNonEntity.eventIndex} TokenNonFungible(${tokenNonEntity.tokenId}) success saved`)
        try {
          await getRepository(TokenNonFungible).insert(tokenNonEntity);
        } catch (e) {
          await getRepository(TokenNonFungible).save(tokenNonEntity);
        }
      }
}
