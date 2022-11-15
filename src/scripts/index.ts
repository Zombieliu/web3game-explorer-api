import { ApiPromise, WsProvider } from '@polkadot/api';
import { Compact } from '@polkadot/types';
import { Moment } from '@polkadot/types/interfaces';
import 'reflect-metadata';
import { Block } from '../entity/blocks';
import { Extrinsic } from '../entity/extrinsics';
import { Event } from '../entity/events';
import { AccountTransfer } from '../entity/account_transfer';

import { getRepository, createConnection } from 'typeorm';

import { AccountTransferScript } from './account_transfer';
import { TokenNonFungibleScript } from './token_non_fungible';

const blocks_process = async (block_number:number,api:any)=>{
  if (block_number === 0){
    const block_num = block_number;
    const blockHash = await api.rpc.chain.getBlockHash(block_number);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    const contentHash = signedBlock.block.contentHash.toString();
    const block_hash = signedBlock.block.hash.toString();
    const parent_block_hash = signedBlock.block.header.parentHash.toString();
    const state_hash = signedBlock.block.header.stateRoot.toString();
    const extrinsics_hash = signedBlock.block.header.extrinsicsRoot.toString();
    const utc_time = new Date();
    const total_extrinsic_hash = signedBlock.block.extrinsics.hash.toString();
    const block = new Block();
    block.block_hash = block_hash;
    block.block_num = block_num;
    block.parent_block_hash = parent_block_hash;
    block.extrinsics_hash = extrinsics_hash;
    block.state_hash = state_hash;
    block.contentHash = contentHash;
    block.total_extrinsic_hash = total_extrinsic_hash;
    block.timestamp = utc_time;

    block.eventNum = 0;
    block.extrinsicNum = 0;
    try {
      await getRepository(Block).insert(block);
    } catch (e) {
      await getRepository(Block).save(block);
    }
    console.log(`Block: ${block.block_num}.`);
  }else {
    const block_num = block_number;
    const blockHash = await api.rpc.chain.getBlockHash(block_number);
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    const block_hash = signedBlock.block.header.hash.toString();
    const contentHash = signedBlock.block.contentHash.toString();
    const parent_block_hash = signedBlock.block.header.parentHash.toString();
    const state_hash = signedBlock.block.header.stateRoot.toString();
    const extrinsics_hash = signedBlock.block.header.extrinsicsRoot.toString();

    const events = await api.query.system.events.at(blockHash);
    const eventNum = events.length;
    const extrinsicNum = signedBlock.block.extrinsics.length;
    const moment = signedBlock.block.extrinsics[0].args[0] as Compact<Moment>;
    const utc_time = new Date(moment.toNumber());
    const total_extrinsic_hash = signedBlock.block.extrinsics.hash.toString();

    const block = new Block();
    block.block_hash = block_hash;
    block.block_num = block_num;
    block.parent_block_hash = parent_block_hash;
    block.extrinsics_hash = extrinsics_hash;
    block.state_hash = state_hash;
    block.contentHash = contentHash;
    block.total_extrinsic_hash = total_extrinsic_hash;
    block.timestamp = utc_time;

    block.eventNum = eventNum;
    block.extrinsicNum = extrinsicNum;
    try {
      await getRepository(Block).insert(block);
    } catch (e) {
      await getRepository(Block).save(block);
    }
    console.log(`Block: ${block.block_num}.`);

  }
};
const extrinsic_process = async (block_number:number,api:any) => {
  const block_num = block_number;
  const blockHash = await api.rpc.chain.getBlockHash(block_number);
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  const block_hash:string = signedBlock.block.header.hash.toString();
  const extrinsics = signedBlock.block.extrinsics;
  const moment = signedBlock.block.extrinsics[0].args[0] as Compact<Moment>;
  const utc_time = new Date(moment.toNumber());

  const extrinsicEntities: Extrinsic[] = [];

  for (const [extrinsic_index, extrinsic] of extrinsics.entries()) {

    const isSigned = extrinsic.isSigned;
    const extrinsic_hash:string = extrinsic.hash.toString();
    const extrinsic_info = extrinsic.toHuman().method;

    let nonce = '';
    let signature = '';
    let signer = '';
    let tip = '';

    if (isSigned){
      nonce = extrinsic.nonce.toString();
      signature = extrinsic.signature.toString();
      signer = extrinsic.signer.toString();
      tip = extrinsic.tip.toString();
    }

    let bytes = extrinsic.toHex().toString();
    let weight_info:string = (await api.rpc.payment.queryInfo(bytes, blockHash)).toString();
      const extrinsic_data = new Extrinsic();
      extrinsic_data.block_num = block_num;
      extrinsic_data.block_hash = block_hash;
      extrinsic_data.extrinsic_num = extrinsic_index.toString();
      extrinsic_data.extrinsic_hash = extrinsic_hash;
      extrinsic_data.section = extrinsic_info.section;
      extrinsic_data.method = extrinsic_info.method;
      if (extrinsic_info.args==undefined){
        extrinsic_data.args = "";
      } else {
        extrinsic_data.args = JSON.stringify(extrinsic_info.args)
      }
      extrinsic_data.nonce = nonce;
      extrinsic_data.signature = signature;
      extrinsic_data.signer = signer;
      extrinsic_data.is_signed = isSigned;
      extrinsic_data.tip = tip;
      extrinsic_data.timestamp = utc_time;
      extrinsic_data.weight_info = weight_info;

      extrinsic_data.meta = extrinsic.meta.toString();
      extrinsic_data.success = false

      extrinsicEntities.push(extrinsic_data)

      console.log(`Extrinsic: ${extrinsic_data.block_num}-${extrinsic_data.extrinsic_num} : ${extrinsic_data.section}.${extrinsic_data.method}(${extrinsic_data.args})`);
  }

  const eventEntities: Event[] = [];

  const events = await api.query.system.events.at(blockHash);
  for (const [event_index, event] of events.entries()) {
    const { event: { data, section, method }, idx } = event;

    const phase = event.phase;
    const eventEntity = new Event();
    eventEntity.block_num = block_num;
    eventEntity.block_hash = block_hash;
    eventEntity.event_index = event_index.toString();
    eventEntity.section = section;
    eventEntity.method = method;
    eventEntity.timestamp = utc_time;
    eventEntity.meta= data.meta.toString()
    eventEntity.data = data.toString()

    let extIndex = 0;

    if (!phase.isApplyExtrinsic) {
        eventEntity.extrinsic_hash = signedBlock.block.extrinsics[extIndex].hash.toString();
        eventEntity.extrinsic_index = extIndex;
        eventEntity.signer = ""
        eventEntities.push(eventEntity);
        continue;
    } else {
        extIndex = phase.asApplyExtrinsic.toNumber();
        eventEntity.extrinsic_hash = signedBlock.block.extrinsics[extIndex].hash.toString();
        eventEntity.extrinsic_index = extIndex;
        eventEntity.signer = signedBlock.block.extrinsics[extIndex].signer.toString()
    }

    console.log(`Event: ${eventEntity.block_num}-${eventEntity.event_index} : ${eventEntity.section}.${eventEntity.method}(${eventEntity.data})`);

    eventEntities.push(eventEntity);
    // check result of extrinsic and calculate weight

    if (section === 'system' && method === 'ExtrinsicSuccess') {
      extrinsicEntities[extIndex].success = true;
      console.debug(`Extrinsic ${eventEntity.block_num}-${extIndex} success`);
    }
    if (section === 'system' && event.method === 'ExtrinsicFailed') {
      console.debug(`Extrinsic ${eventEntity.block_num}-${extIndex} fail`);
    }

    await AccountTransferScript(event, signedBlock, event_index);
    // await TokenNonFungibleScript(event, signedBlock);

    // // calculate the fee of extrinsic
    // const extrinsicId = `${eventEntity.block_num}-${extIndex}`;
    // if (section === 'treasury' && event.method === 'Deposit') {
    //   const toTreasury = event.data[0] as Balance; // treasury.Deposit(Balance)
    //   extFees[extIndex].toTreasury(toTreasury);
    //   log.debug(`Extrinsic ${extrinsicId} to treasury fee: ${toTreasury}`);
    // }
    // if (event.section === 'balances' && event.method === 'Deposit') {
    //   const toAuthor = event.data[1] as Balance; // balances.Deposit(AccountId, Balance)
    //   extFees[extIndex].toAuthor(toAuthor);
    //   log.debug(`Extrinsic ${extrinsicId} to author fee: ${toAuthor}`);
    // }

  }

  try {
    await getRepository(Extrinsic).insert(extrinsicEntities);
  } catch (e) {
    await getRepository(Extrinsic).save(extrinsicEntities);
  }
  try {
    await getRepository(Event).insert(eventEntities);
  } catch (e) {
    await getRepository(Event).save(eventEntities);
  }
};

const latest_block_num_check = async (api:any) => {
  const signedBlock = await api.rpc.chain.getBlock();
  // const latest_block_num = (signedBlock.toHuman()as any).block.header.number;
  const latest_block_num = signedBlock.toJSON().block.header.number;
  return latest_block_num;
};

const start_progress = async (start_block:number,api:any) =>{
  await blocks_process(start_block,api);
  if (start_block > 0) {
    await extrinsic_process(start_block,api);
  }
  // await events_process(start_block,api);
};

const loop_check = async (api:any) => {
  // const last_block_num =  await AppDataSource.manager.count(Block);
  const last_block_num = await getRepository(Block).count()
  const latest_block_num = await latest_block_num_check(api);
  if (latest_block_num != last_block_num){
    for (let start_block = last_block_num; start_block < latest_block_num; start_block++) {
      await start_progress(start_block,api);
    }
    await loop_check(api);
  }else{
    setTimeout(async () =>{
      const last_block_num = await getRepository(Block).count()

      const latest_block_num = await latest_block_num_check(api);
      await loop_start_process(last_block_num,latest_block_num,api);
    },6000);
  }
};

const loop_start_process = async (last_block_num: number,latest_block_num: number, api:any) =>{
  for (let start_block = last_block_num; start_block < latest_block_num; start_block++) {
    await start_progress(start_block,api);
  }
  await loop_check(api);
};

const start_query_block_chain = async () => {
  const wsProvider = new WsProvider('wss://devnet.web3games.org');
  const api = await ApiPromise.create({ provider: wsProvider });
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "postgres",
    entities: [
        Block, Extrinsic, Event, AccountTransfer
    ],
    synchronize: true,
    logging: false
}).then(async (connection) => {
    console.log("TsRPC Connect PostgreSQL Successed!");

    const last_block_num = await getRepository(Block).count()
    const latest_block_num = await latest_block_num_check(api);
    await loop_start_process(last_block_num,latest_block_num,api);
    // here you can start to work with your entities
}).catch(error => console.log(error));
};

export default start_query_block_chain


