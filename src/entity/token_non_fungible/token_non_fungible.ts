// 每当有token_non_fungible的event(TokenCrated / Transfer)被触发，就需要重新读一遍存储，并把他保存下来。
import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import { TokenNonFungibleCreated } from './token_non_fungible_created';
import _ from 'lodash';

// 在触发TokenNonFungible的Event的时候就重新查询存储，并更新数据表。
@Entity()
export class TokenNonFungible {
    @PrimaryColumn()
    owner!: string;

    @PrimaryColumn()
    nonFungibleTokenId!: string;

    @PrimaryColumn()
    tokenId!: string;

    @Column({ type: 'bigint' })
    blockNum!: string;

    @Column()
    eventIndex!: number

    @Column()
    extrinsicIndex!: number

    tokenNonFungibleCreated: TokenNonFungibleCreated | null = null;
}

@EntityRepository(TokenNonFungible)
export class TokenNonFungibleRepository extends Repository<TokenNonFungible> {
  public findManyAndCount(
    owner?: string,
    nonFungibleTokenId?: string,
    tokenId?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<TokenNonFungible>> {
    let qb = this.createQueryBuilder('token_non_fungible')
      .orderBy('token_non_fungible.blockNum', 'DESC')
      .addOrderBy('token_non_fungible.eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);

    if (!_.isUndefined(owner)) {
      qb = qb.andWhere('owner = :owner', { owner });
    }

    if (!_.isUndefined(nonFungibleTokenId)) {
      qb = qb.andWhere('nonFungibleTokenId = :nonFungibleTokenId', { nonFungibleTokenId });
    }

    if (!_.isUndefined(tokenId)) {
      qb = qb.andWhere('tokenId = :tokenId', { tokenId });
    }

    // ORM generate count(distinct) sql, which is much slower
    const count = qb.getCount();
    const ownerNfts = qb
      .leftJoinAndMapOne(
        'token_non_fungible.tokenNonFungibleCreated',
        TokenNonFungibleCreated,
        'token_non_fungible_created',
        'token_non_fungible_created.nonFungibleTokenId = token_non_fungible.nonFungibleTokenId',
      )
      .getMany();
    return Promise.all([count, ownerNfts]).then(([count, ownerNfts]) => {
      return {
        total: count,
        items: ownerNfts,
      };
    });
  }

  // public findOneByNum(blockNum: number, eventIndex: number): Promise<TokenNonFungible | undefined> {
  //   return this.createQueryBuilder('block')
  //     .where('blockNum = :blockNum', { blockNum })
  //     .andWhere('eventIndex = :eventIndex', { eventIndex })
  //     .getOne();
  // }

  // public findOneByHash(blockHash: string): Promise<TokenNonFungible | undefined> {
  //   return this.createQueryBuilder('block')
  //     .where('block_hash = :blockHash', { blockHash })
  //     .getOne();
  // }

  public updateNFTInfo(
    nonFungibleTokenId: string,
    tokenId: string,
    oldOwner: string,
    update: {
      owner: string,
      blockNum: string,
      eventIndex: number,
      extrinsicIndex: number,
    },
  ): Promise<unknown> {
    const qb = this.createQueryBuilder()
      .update()
      .set({
        owner: update.owner,
        blockNum: update.blockNum,
        eventIndex: update.eventIndex,
        extrinsicIndex: update.extrinsicIndex,
      })
      .where('nonFungibleTokenId = :nonFungibleTokenId', { nonFungibleTokenId })
      .andWhere('tokenId = :tokenId', { tokenId })
      .andWhere('owner = :oldOwner', { oldOwner })
    return qb.execute();
  }
}
