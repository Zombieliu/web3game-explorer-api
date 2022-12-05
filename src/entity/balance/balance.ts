// 每当有balance的event被触发，就需要重新读一遍存储，并把他保存下来。
import { Entity, Column, PrimaryColumn, EntityRepository, Repository } from 'typeorm';
import { defaultOffset, maxLimit, PageQueries, DataResult } from '../../common';
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
    owner!: string 

    @Column({ type: 'bigint' })
    balance!: string;
  
    @Column()
    timestamp!: Date
}