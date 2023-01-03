import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import _ from 'lodash';

import { TokenFungibleCreated } from './token_fungible_created'

@Entity()
export class TokenFungibleTransfer {
    @PrimaryColumn({ type: 'bigint' })
    blockNum!: string;

    @PrimaryColumn()
    eventIndex!: number

    @Column()
    extrinsicHash!: string

    @Column()
    extrinsicIndex!: number

    @Column()
    fungibleTokenId!: string 

    @Column()
    fromAccount!: string 

    @Column()
    toAccount!:String
    
    @Column()
    balance!: string;
  
    @Column()
    timestamp!: Date

    tokenFungibleCreated: TokenFungibleCreated | null = null;
}

@EntityRepository(TokenFungibleTransfer)
export class TokenFungibleTransferRepository extends Repository<TokenFungibleTransfer> {
  public findManyAndCount(
    blockNum?: string,
    eventIndex?: string,
    fungibleTokenId?: string,
    fromAccount?: string,
    toAccount?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<TokenFungibleTransfer>> {
    let qb = this.createQueryBuilder('token_fungible_transfer')
      .orderBy('token_fungible_transfer.blockNum', 'DESC')
      .addOrderBy('token_fungible_transfer.eventIndex', 'DESC')
      .leftJoinAndMapOne(
        'token_fungible_transfer.tokenFungibleCreated',
        TokenFungibleCreated,
        'token_fungible_created',
        'token_fungible_created.fungibleTokenId = token_fungible_transfer.fungibleTokenId',
      )
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);


    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('token_fungible_transfer.blockNum = :blockNum', { blockNum });
    }

    if (!_.isUndefined(eventIndex)) {
      qb = qb.andWhere('token_fungible_transfer.eventIndex = :eventIndex', { eventIndex });
    }

    if (!_.isUndefined(fungibleTokenId)) {
      qb = qb.andWhere('token_fungible_created.fungibleTokenId = :fungibleTokenId and token_fungible_transfer.fungibleTokenId = :fungibleTokenId', { fungibleTokenId })
    }
  

    if (!_.isUndefined(fromAccount) || !_.isUndefined(toAccount)) {
      if (!_.isUndefined(fromAccount) && !_.isUndefined(toAccount)) {
        qb = qb.andWhere('token_fungible_transfer.fromAccount = :fromAccount or token_fungible_transfer.toAccount = :toAccount', { fromAccount, toAccount });
      } else if (!_.isUndefined(fromAccount)) {
        qb = qb.andWhere('token_fungible_transfer.fromAccount = :fromAccount', { fromAccount });
      } else if (!_.isUndefined(toAccount)) {
        qb = qb.andWhere('token_fungible_transfer.toAccount = :toAccount', { toAccount });
      }
    }

    // ORM generate count(distinct) sql, which is much slower
    const count = qb.getCount();
    const account_transfers = qb.getMany();
    return Promise.all([count, account_transfers]).then(([count, account_transfers]) => {
      return {
        total: count,
        items: account_transfers,
      };
    });
  }
}
