import { Entity,  Column, PrimaryColumn, Repository, EntityRepository } from 'typeorm';
import _ from 'lodash';

import { defaultOffset, maxLimit, PageQueries, DataResult } from '../common';
import { bool } from '@polkadot/types';

@Entity()
export class Extrinsic {
    @PrimaryColumn({ type: 'bigint' })
    block_num!: number;

    @Column()
    block_hash!: string;

    @PrimaryColumn()
    extrinsic_num!: string;

    @Column()
    extrinsic_hash!: string;

    @Column()
    section!: string;

    @Column()
    method!: string;

    @Column()
    args!: string;

    @Column()
    meta!: string

    @Column()
    nonce!: string;

    @Column()
    signature!: string;

    @Column()
    signer!: string;

    @Column()
    is_signed!: Boolean;

    @Column()
    success!: boolean

    @Column()
    tip!: string;

    @Column()
    weight_info!: string;

    @Column()
    timestamp!: Date;
}


@EntityRepository(Extrinsic)
export class ExtrinsicRepository extends Repository<Extrinsic> {
  public findManyAndCount(
    blockNum?: number,
    offset = defaultOffset,
    limit = maxLimit,
): Promise<DataResult<Extrinsic>> {
    let qb = this.createQueryBuilder('extrinsic')
      .orderBy('block_num', 'DESC')
      .addOrderBy('extrinsic_num', 'ASC')
      .offset(offset)
      .limit(limit > maxLimit ? maxLimit : limit);

    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('block_num = :blockNum', { blockNum });
    }

    // ORM generate count(distinct) sql, which is much slower
    const count = qb.getCount();
    const extrinsics = qb.getMany();
    return Promise.all([count, extrinsics]).then(([count, extrinsics]) => {
      return {
        total: count,
        items: extrinsics,
      };
    });
  }

  public findOneByBlockNumAndIndex(blockNum: number, extrinsicIndex: number): Promise<Extrinsic | undefined> {
    return this.createQueryBuilder('extrinsic')
      .where('block_num = :blockNum', { blockNum })
      .andWhere('extrinsic_num = :extrinsicIndex', { extrinsicIndex })
      .getOne();
  }

  public findOneByExtHash(extrinsicHash: string): Promise<Extrinsic | undefined> {
    return this.createQueryBuilder('extrinsic')
      .where('extrinsic_hash = :extrinsicHash', { extrinsicHash })
      .getOne();
  }

  public findCountByBlockNum(blockNum: number): Promise<number> {
    return this.createQueryBuilder('extrinsic')
      .where('block_num = :blockNum', { blockNum })
      .getCount();
  }

  public findSignerCount({
    fromTime,
    toTime,
  }: Partial<{ fromTime: number; toTime: number }>): Promise<number> {
    let qb = this.createQueryBuilder().where('is_signed = true');

    if (!_.isUndefined(fromTime)) {
      qb = qb.andWhere('timestamp >= to_timestamp(:fromTime)', { fromTime });
    }
    if (!_.isUndefined(toTime)) {
      qb = qb.andWhere('timestamp <= to_timestamp(:toTime)', { toTime });
    }

    return qb
      .select('COUNT(DISTINCT signer)')
      .getRawOne()
      .then(({ count }) => +count);
  }
}
