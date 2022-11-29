import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, Repository, EntityRepository } from 'typeorm';
import _ from 'lodash';

import { defaultOffset, maxLimit, PageQueries, DataResult } from '../common';

@Entity()
export class Event {
    @PrimaryColumn({ type: 'bigint' })
    block_num!: number;

    @Column()
    block_hash!: string;

    @PrimaryColumn()
    event_index!: string;
    
    @Column({ type: 'varchar', nullable: true })
    extrinsic_hash: string | null = null;

    @Column({ type: 'integer', nullable: true })
    extrinsic_index: number | null = null;

    @Column()
    section!: string;

    @Column()
    method!: string;

    @Column()
    data!: string;

    @Column()
    meta!: string;

    @Column()
    signer!: string;

    @Column()
    timestamp!: Date;
}

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  public findManyAndCount(
    blockNum?: number,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<Event>> {
    let qb = this.createQueryBuilder();

    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('block_num = :blockNum', { blockNum });
    }
    // if (!_.isUndefined(extrinsicIndex)) {
    //   qb = qb.andWhere('extrinsic_index = :extrinsicIndex', { extrinsicIndex });
    // }

    return qb
      .orderBy('block_num', 'DESC')
      .addOrderBy('event_index', 'ASC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit)
      .getManyAndCount()
      .then(([entites, count]) => {
        return {
          total: count,
          items: entites,
        };
      });
  }

  public findOneByBlockNumAndIndex(blockNum: number, eventIndex: number): Promise<Event[] | undefined> {
    return this.createQueryBuilder('event')
      .where('block_num = :blockNum', { blockNum })
      .andWhere('event_index = :eventIndex', { eventIndex })
      .getMany();
  }

  public findByExt(blockNum: number, extrinsicIndex: number): Promise<Event[] | undefined> {
    return this.createQueryBuilder('event')
      .where('block_num = :blockNum', { blockNum })
      .andWhere('extrinsic_num = :extrinsicIndex', { extrinsicIndex })
      .getMany();
  }

  public findManyByBlock(numOrHash: number | string): Promise<Event[] | undefined> {
    if (typeof numOrHash === 'number') {
      return this.findManyByBlockNum(numOrHash);
    } else {
      return this.findManyByBlockHash(numOrHash);
    }
  }
  
  public findManyByBlockNum(blockNum: number): Promise<Event[] | undefined> {
    return this.createQueryBuilder('event')
      .where('block_num = :blockNum', { blockNum })
      .getMany();
  }

  public findManyByBlockHash(blockHash: string): Promise<Event[] | undefined> {
    return this.createQueryBuilder('event')
      .where('block_hash = :blockHash', { blockHash })
      .getMany();
  }

  public findCountByBlockNum(blockNum: number): Promise<number> {
    return this.createQueryBuilder('event')
      .where('block_num = :blockNum', { blockNum })
      .getCount();
  }

  public findCount({
    module,
    event,
    fromTime,
    toTime,
  }: Partial<{
    module: string;
    event: string;
    fromTime: number;
    toTime: number;
  }>): Promise<number> {
    let qb = this.createQueryBuilder();

    if (module) {
      qb = qb.andWhere('module = :module', { module });
    }
    if (event) {
      qb = qb.andWhere('event = :event', { event });
    }
    if (!_.isUndefined(fromTime)) {
      qb = qb.andWhere('timestamp >= to_timestamp(:fromTime)', { fromTime });
    }
    if (!_.isUndefined(toTime)) {
      qb = qb.andWhere('timestamp <= to_timestamp(:toTime)', { toTime });
    }

    return qb.getCount();
  }
}
