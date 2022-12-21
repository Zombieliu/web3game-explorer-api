import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
import _ from 'lodash';

@Entity()
export class TokenFungibleCreated {
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
    who!: string 

    @Column()
    name!:String
    
    @Column()
    symbol!: string;

    @Column()
    decimals!: number;
  
    @Column()
    timestamp!: Date
}

@EntityRepository(TokenFungibleCreated)
export class TokenFungibleCreatedRepository extends Repository<TokenFungibleCreated> {
  public findManyAndCount(
    blockNum?: string,
    eventIndex?: string,
    fungibleTokenId?: string,
    who?: string,
    offset = defaultOffset,
    limit = maxLimit,
  ): Promise<DataResult<TokenFungibleCreated>> {
    let qb = this.createQueryBuilder('token_fungible_created')
      .orderBy('token_fungible_created.blockNum', 'DESC')
      .addOrderBy('token_fungible_created.eventIndex', 'DESC')
      .skip(offset)
      .take(limit > maxLimit ? maxLimit : limit);

    if (!_.isUndefined(blockNum)) {
      qb = qb.andWhere('token_fungible_created.blockNum = :blockNum', { blockNum });
    }

    if (!_.isUndefined(eventIndex)) {
      qb = qb.andWhere('token_fungible_created.eventIndex = :eventIndex', { eventIndex });
    }

    if (!_.isUndefined(fungibleTokenId)) {
      qb = qb.andWhere('token_fungible_created.fungibleTokenId = :fungibleTokenId', { fungibleTokenId });
    }

    if (!_.isUndefined(who)) {
      qb = qb.andWhere('token_fungible_created.who = :who', { who });
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

  public findOneById(fungibleTokenId: string): Promise<TokenFungibleCreated | undefined> {
    return this.createQueryBuilder('token_fungible_created')
      .where('token_fungible_created.fungibleTokenId = :fungibleTokenId', { fungibleTokenId })
      .getOne();
  }
}
