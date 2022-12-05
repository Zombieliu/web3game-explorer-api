import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import 'reflect-metadata';
import { Block } from '../../entity/blocks';
import { TokenNonFungibleCreated } from '../../entity/token_non_fungible/token_non_fungible_created';
import { TokenNonFungibleTransfer } from '../../entity/token_non_fungible/token_non_fungible_transfer';
import { TokenNonFungible, TokenNonFungibleRepository } from '../../entity/token_non_fungible/token_non_fungible';
import { Event } from '../../entity/events';
import { getRepository, getCustomRepository, createConnection } from 'typeorm';
import {Balance,AccountId,Moment} from "@polkadot/types/interfaces";

export async function TokenNonFungibleTokenCreatedScript(event: any, block: any, eventIdx: any, api?:any) {
    const {event: {data: [nonFungibleTokenId, account, name, symbol, base_uri], section, method}, phase, idx} = event;

    if (section === 'tokenNonFungible' && method === 'TokenCreated') {
        const extIndex = phase.asApplyExtrinsic.toNumber();
        const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

        let tokenNonEntity = new TokenNonFungibleCreated()

        tokenNonEntity.blockNum = block.block.header.number.toString();
        tokenNonEntity.eventIndex = eventIdx;
        tokenNonEntity.extrinsicIndex = extIndex;
        tokenNonEntity.nonFungibleTokenId = nonFungibleTokenId.toString();
        tokenNonEntity.who = (account as AccountId).toString();
        tokenNonEntity.name = name;
        tokenNonEntity.symbol = symbol;
        tokenNonEntity.base_uri = base_uri;
        tokenNonEntity.timestamp = new Date(moment.toNumber());

        console.debug(`${tokenNonEntity.blockNum}-${tokenNonEntity.eventIndex} TokenNonFungibleCreated(${tokenNonEntity.nonFungibleTokenId}) success saved`)
        try {
          await getRepository(TokenNonFungibleCreated).insert(tokenNonEntity);
        } catch (e) {
          await getRepository(TokenNonFungibleCreated).save(tokenNonEntity);
        }
      }
}

export async function TokenNonFungibleTokenTransferScript(event: any, block: any, eventIdx: any, api?:any) {
  const {event: {data: [nonFungibleTokenId, from, to, tokenId], section, method}, phase, idx} = event;

  if (section === 'tokenNonFungible' && method === 'Transfer') {
      const extIndex = phase.asApplyExtrinsic.toNumber();
      const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;

      let tokenNonTransferEntity = new TokenNonFungibleTransfer()

      tokenNonTransferEntity.blockNum = block.block.header.number.toString();
      tokenNonTransferEntity.eventIndex = eventIdx;
      tokenNonTransferEntity.extrinsicIndex = extIndex;
      tokenNonTransferEntity.fromAccount = (from as AccountId).toString();
      tokenNonTransferEntity.toAccount = (to as AccountId).toString();
      tokenNonTransferEntity.nonFungibleTokenId = nonFungibleTokenId.toString();
      tokenNonTransferEntity.tokenId = tokenId.toString();
      tokenNonTransferEntity.timestamp = new Date(moment.toNumber());

      console.debug(`${tokenNonTransferEntity.blockNum}-${tokenNonTransferEntity.eventIndex} TokenNonFungible(${tokenNonTransferEntity.fromAccount} transfer ${tokenNonTransferEntity.nonFungibleTokenId}-${tokenNonTransferEntity.tokenId} to ${tokenNonTransferEntity.toAccount}) success saved`)
      try {
        await getRepository(TokenNonFungibleTransfer).insert(tokenNonTransferEntity);
      } catch (e) {
        await getRepository(TokenNonFungibleTransfer).save(tokenNonTransferEntity);
      }
    }
}

export async function TokenNonFungibleScript(event: any, block: any, eventIdx: any, api?:any) {
  const {event: {data: [nonFungibleTokenId, from, to, tokenId], section, method}, phase, idx} = event;

  if (section === 'tokenNonFungible' && method === 'Transfer') {
      const extIndex = phase.asApplyExtrinsic.toNumber();
      const moment = block.block.extrinsics[0].args[0] as Compact<Moment>;
      console.log(`fromAddress: ${from}, toAddress: ${to}, NonFunTokenId: ${nonFungibleTokenId}, TokenId: ${tokenId}`);
      if (from == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM") {
      // 判断 判断from地址，如果是000地址，to地址就是owner，
      // 如果不是 000地址。则这个nft之前肯定存储了的，所以此时 讲NFT(nonid, tokenid)的owner address(owner address其实就是from address)替换成to address
        let tokenNonEntity = new TokenNonFungible()

        tokenNonEntity.owner = (to as AccountId).toString();
        tokenNonEntity.nonFungibleTokenId = nonFungibleTokenId.toString();
        tokenNonEntity.tokenId = tokenId.toString();

        tokenNonEntity.blockNum = block.block.header.number.toString();
        tokenNonEntity.eventIndex = eventIdx;
        tokenNonEntity.extrinsicIndex = extIndex;
        console.debug(`${tokenNonEntity.blockNum}-${tokenNonEntity.eventIndex} TokenNonFungible(${tokenNonEntity.owner}, ${tokenNonEntity.nonFungibleTokenId},${tokenNonEntity.tokenId}) success saved`)
        try {
          await getRepository(TokenNonFungible).insert(tokenNonEntity);
        } catch (e) {
          await getRepository(TokenNonFungible).save(tokenNonEntity);
        }
      } else {
        let blockNum = block.block.header.number.toString();
        let eventIndex = eventIdx;
        let extrinsicIndex = extIndex;

        let oldOwner = (from as AccountId).toString()
        let owner = (to as AccountId).toString()
        let nonFunTokenId = nonFungibleTokenId.toString();
        let tokenIdStr = tokenId.toString();
        
        await getCustomRepository(TokenNonFungibleRepository).updateNFTInfo(
          nonFunTokenId,
          tokenIdStr,
          oldOwner,
          {
            owner,
            blockNum,
            eventIndex,
            extrinsicIndex
          },
        )
        console.debug(`${blockNum}-${eventIndex} TokenNonFungible(${owner}, ${nonFunTokenId},${tokenIdStr}) success saved`)
      }

    }
    
}
