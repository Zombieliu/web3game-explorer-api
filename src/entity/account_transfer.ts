import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../common';
import _ from 'lodash';

@Entity()
export class AccountTransfer {
    @PrimaryColumn({ type: 'bigint' })
    blockNum!: number;

    @PrimaryColumn()
    eventIndex!: number
    
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
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<AccountTransfer>> {
    let qb = this.createQueryBuilder('account_transfer')
      .orderBy('blockNum', 'DESC')
      .orderBy('eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);

    // ORM generate count(distinct) sql, which is much slower
    const count = qb.getCount();
    const blocks = qb.getMany();
    return Promise.all([count, blocks]).then(([count, blocks]) => {
      return {
        total: count,
        items: blocks,
      };
    });
  }


  public findOneByNum(blockNum: number, eventIndex: number): Promise<AccountTransfer | undefined> {
    return this.createQueryBuilder('block')
      .where('blockNum = :blockNum', { blockNum })
      .andWhere('eventIndex = :eventIndex', { eventIndex })
      .getOne();
  }

  public findOneByHash(blockHash: string): Promise<AccountTransfer | undefined> {
    return this.createQueryBuilder('block')
      .where('block_hash = :blockHash', { blockHash })
      .getOne();
  }
}
