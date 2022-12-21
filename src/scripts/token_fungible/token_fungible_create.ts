import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../../entity/blocks';
import { TokenFungibleCreated, TokenFungibleCreatedRepository } from '../../entity/token_fungible/token_fungible_created';
import { Event } from '../../entity/events';
import { getRepository, getCustomRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";

export async function TokenFungibleCreatedScript(event: any, block: any, eventIdx: any, api?:any) {
    const {event: {section, method}} = event;

    if (section === 'tokenFungible' && method === 'TokenCreated') {
      const {event: {data: [fungibleTokenId, who, name, symbol, decimals]}, phase} = event;

      const extIndex = phase.asApplyExtrinsic.toNumber();
      const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

      let tokenCreatedEntity = new TokenFungibleCreated()

      tokenCreatedEntity.blockNum = block.block.header.number.toString();
      tokenCreatedEntity.eventIndex = eventIdx;
      tokenCreatedEntity.extrinsicHash = block.block.extrinsics[extIndex].hash.toString();
      tokenCreatedEntity.extrinsicIndex = extIndex;
      tokenCreatedEntity.fungibleTokenId = fungibleTokenId.toString();
      tokenCreatedEntity.who = who.toString();
      tokenCreatedEntity.name = name.toString();
      tokenCreatedEntity.symbol = symbol.toString();
      tokenCreatedEntity.decimals = decimals.toNumber();
      tokenCreatedEntity.timestamp = new Date(moment.toNumber());

      console.debug(`TokenFungibleCreated ${tokenCreatedEntity.blockNum}-${tokenCreatedEntity.eventIndex} TokenFungible(${tokenCreatedEntity.who} created ${tokenCreatedEntity.fungibleTokenId}-${tokenCreatedEntity.name}) success saved`)
      try {
        await getRepository(TokenFungibleCreated).insert(tokenCreatedEntity);
      } catch (e) {
        await getRepository(TokenFungibleCreated).save(tokenCreatedEntity);
      }
    }
}
