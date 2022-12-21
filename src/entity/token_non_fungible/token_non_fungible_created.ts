import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import _ from 'lodash';

@Entity()
export class TokenNonFungibleCreated {
    @PrimaryColumn({ type: 'bigint' })
    blockNum!: string;

    @PrimaryColumn()
    eventIndex!: number

    @Column()
    extrinsicIndex!: number
    
    @PrimaryColumn()
    nonFungibleTokenId!: string;

    @PrimaryColumn()
    who!: string;

    @Column()
    name!: string

    @Column()
    symbol!: string

    @Column()
    base_uri!: string

    @Column()
    timestamp!: Date
}

@EntityRepository(TokenNonFungibleCreated)
export class TokenNonFungibleCreatedRepository extends Repository<TokenNonFungibleCreated> {
  public findManyAndCount(
    who?: string,
    nonFungibleTokenId?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<TokenNonFungibleCreated>> {
    let qb = this.createQueryBuilder('token_non_fungible_created')
      .orderBy('token_non_fungible_created.blockNum', 'DESC')
      .addOrderBy('token_non_fungible_created.eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);

    if (!_.isUndefined(who)) {
      qb = qb.andWhere('token_non_fungible_created.who = :who', { who });
    }

    if (!_.isUndefined(nonFungibleTokenId)) {
      qb = qb.andWhere('token_non_fungible_created.nonFungibleTokenId = :nonFungibleTokenId', { nonFungibleTokenId });
    }

    // ORM generate count(distinct) sql, which is much slower
    const count = qb.getCount();
    const nonFungibleCreated = qb.getMany();
    return Promise.all([count, nonFungibleCreated]).then(([count, nonFungibleCreated]) => {
      return {
        total: count,
        items: nonFungibleCreated,
      };
    });
  }

  // public findOneByNum(blockNum: number, eventIndex: number): Promise<TokenNonFungibleCreated | undefined> {
  //   return this.createQueryBuilder('block')
  //     .where('blockNum = :blockNum', { blockNum })
  //     .andWhere('eventIndex = :eventIndex', { eventIndex })
  //     .getOne();
  // }

  // public findOneByHash(blockHash: string): Promise<TokenNonFungibleCreated | undefined> {
  //   return this.createQueryBuilder('block')
  //     .where('block_hash = :blockHash', { blockHash })
  //     .getOne();
  // }
}
