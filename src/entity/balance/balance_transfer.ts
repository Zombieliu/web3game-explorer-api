import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import _ from 'lodash';

@Entity()
export class AccountTransfer {
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
    balance!: string;
  
    @Column()
    timestamp!: Date
}

@EntityRepository(AccountTransfer)
export class AccountTransferRepository extends Repository<AccountTransfer> {
  public findManyAndCount(
    blockNum?: string,
    eventIndex?: string,
    fromAccount?: string,
    toAccount?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<AccountTransfer>> {
    let qb = this.createQueryBuilder('account_transfer')
      .orderBy('account_transfer.blockNum', 'DESC')
      .addOrderBy('account_transfer.eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);


    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('account_transfer.blockNum = :blockNum', { blockNum });
    }

    if (!_.isUndefined(eventIndex)) {
      qb = qb.andWhere('account_transfer.eventIndex = :eventIndex', { eventIndex });
    }

    if (!_.isUndefined(fromAccount) || !_.isUndefined(toAccount)) {
      if (!_.isUndefined(fromAccount) && !_.isUndefined(toAccount)) {
        qb = qb.andWhere('account_transfer.fromAccount = :fromAccount or account_transfer.toAccount = :toAccount', { fromAccount, toAccount });
      } else if (!_.isUndefined(fromAccount)) {
        qb = qb.andWhere('account_transfer.fromAccount = :fromAccount', { fromAccount });
      } else if (!_.isUndefined(toAccount)) {
        qb = qb.andWhere('account_transfer.toAccount = :toAccount', { toAccount });
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
