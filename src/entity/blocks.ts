import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../common';
import _ from 'lodash';

@Entity()
export class Block {
    @PrimaryColumn({ type: 'bigint' })
    block_num!: number;

    @Column()
    block_hash!: string;

    @Column()
    parent_block_hash!: string;

    @Column()
    extrinsics_hash!: string;

    @Column()
    state_hash!: string;

    @Column()
    contentHash!: string;

    @Column()
    total_extrinsic_hash!: string;

    @Column()
    timestamp!: Date;

    @Column()
    eventNum!: number

    @Column()
    extrinsicNum!: number
}

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {
  public findManyAndCount(
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<Block>> {
    let qb = this.createQueryBuilder('block')
      .orderBy('block_num', 'DESC')
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

  public findOneBy(numOrHash: number | string): Promise<Block | undefined> {
    if (typeof numOrHash === 'number') {
      return this.findOneByNum(numOrHash);
    } else {
      return this.findOneByHash(numOrHash);
    }
  }
  
  public findOneByNum(blockNum: number): Promise<Block | undefined> {
    return this.createQueryBuilder('block')
      .where('block_num = :blockNum', { blockNum })
      .getOne();
  }

  public findOneByHash(blockHash: string): Promise<Block | undefined> {
    return this.createQueryBuilder('block')
      .where('block_hash = :blockHash', { blockHash })
      .getOne();
  }
}
