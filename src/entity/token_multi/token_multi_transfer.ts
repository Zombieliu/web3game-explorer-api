import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import _ from 'lodash';

@Entity()
export class TokenMultiTransfer {
    @PrimaryColumn({ type: 'bigint' })
    blockNum!: string;

    @PrimaryColumn()
    eventIndex!: number

    @Column()
    extrinsicHash!: string

    @Column()
    extrinsicIndex!: number

    @Column({ type: 'bigint' })
    multiTokenId!: string 

    @Column()
    fromAccount!: string 

    @Column()
    toAccount!: string
    
    
    @Column({ type: 'jsonb' })
    tokenIds!: string[]

    @Column({ type: 'jsonb' })
    balances!: string[]
  
    @Column()
    timestamp!: Date
}

@EntityRepository(TokenMultiTransfer)
export class TokenMultiTransferRepository extends Repository<TokenMultiTransfer> {
  public findManyAndCount(
    blockNum?: string,
    eventIndex?: string,
    multiTokenId?: string,
    fromAccount?: string,
    toAccount?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<TokenMultiTransfer>> {
    let qb = this.createQueryBuilder('token_multi')
      .orderBy('token_multi.blockNum', 'DESC')
      .addOrderBy('token_multi.eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);

    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('token_multi.blockNum = :blockNum', { blockNum });
    }

    if (!_.isUndefined(eventIndex)) {
      qb = qb.andWhere('token_multi.eventIndex = :eventIndex', { eventIndex });
    }

    if (!_.isUndefined(multiTokenId)) {
      qb = qb.andWhere('token_multi.multiTokenId = :multiTokenId', { multiTokenId });
    }
  
    if (!_.isUndefined(fromAccount) || !_.isUndefined(toAccount)) {
      if (!_.isUndefined(fromAccount) && !_.isUndefined(toAccount)) {
        qb = qb.andWhere('token_multi.fromAccount = :fromAccount or token_multi.toAccount = :toAccount', { fromAccount, toAccount });
      } else if (!_.isUndefined(fromAccount)) {
        qb = qb.andWhere('token_multi.fromAccount = :fromAccount', { fromAccount });
      } else if (!_.isUndefined(toAccount)) {
        qb = qb.andWhere('token_multi.toAccount = :toAccount', { toAccount });
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
