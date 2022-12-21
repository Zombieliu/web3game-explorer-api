import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import _ from 'lodash';

@Entity()
export class TokenNonFungibleTransfer {
    @PrimaryColumn({ type: 'bigint' })
    blockNum!: string;

    @PrimaryColumn()
    eventIndex!: number
    
    @Column()
    extrinsicHash!: string

    @Column()
    extrinsicIndex!: number

    @Column()
    fromAccount!: string 

    @Column()
    toAccount!:String

    @Column()
    nonFungibleTokenId!: string;

    @Column()
    tokenId!: string;
  
    @Column()
    timestamp!: Date
}

@EntityRepository(TokenNonFungibleTransfer)
export class TokenNonFungibleTransferRepository extends Repository<TokenNonFungibleTransfer> {
  public findManyAndCount(
    blockNum?: string,
    eventIndex?: string,
    fromAccount?: string,
    toAccount?: string,
    nonFungibleTokenId?: string,
    tokenId?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<TokenNonFungibleTransfer>> {
    let qb = this.createQueryBuilder('token_non_fungible_transfer')
      .orderBy('token_non_fungible_transfer.blockNum', 'DESC')
      .addOrderBy('token_non_fungible_transfer.eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);

    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('token_non_fungible_transfer.blockNum = :blockNum', { blockNum });
    }

    if (!_.isUndefined(eventIndex)) {
      qb = qb.andWhere('token_non_fungible_transfer.eventIndex = :eventIndex', { eventIndex });
    }

    if (!_.isUndefined(fromAccount) || !_.isUndefined(toAccount)) {
      if (!_.isUndefined(fromAccount) && !_.isUndefined(toAccount)) {
        qb = qb.andWhere('token_non_fungible_transfer.fromAccount = :fromAccount or token_non_fungible_transfer.toAccount = :toAccount', { fromAccount, toAccount });
      } else if (!_.isUndefined(fromAccount)) {
        qb = qb.andWhere('token_non_fungible_transfer.fromAccount = :fromAccount', { fromAccount });
      } else if (!_.isUndefined(toAccount)) {
        qb = qb.andWhere('token_non_fungible_transfer.toAccount = :toAccount', { toAccount });
      }
    }

    if (!_.isUndefined(nonFungibleTokenId)) {
      qb = qb.andWhere('token_non_fungible_transfer.nonFungibleTokenId = :nonFungibleTokenId', { nonFungibleTokenId });
    }

    if (!_.isUndefined(tokenId)) {
      qb = qb.andWhere('token_non_fungible_transfer.tokenId = :tokenId', { tokenId });
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

  // public findOneByNum(blockNum: number, eventIndex: number): Promise<TokenNonFungibleTransfer | undefined> {
  //   return this.createQueryBuilder('block')
  //     .where('blockNum = :blockNum', { blockNum })
  //     .andWhere('eventIndex = :eventIndex', { eventIndex })
  //     .getOne();
  // }

  // public findOneByHash(blockHash: string): Promise<TokenNonFungibleTransfer | undefined> {
  //   return this.createQueryBuilder('block')
  //     .where('block_hash = :blockHash', { blockHash })
  //     .getOne();
  // }
}
