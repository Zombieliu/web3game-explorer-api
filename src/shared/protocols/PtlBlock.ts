export interface ReqBlock {
    block_num: string
}

export interface ResBlock {
    block_num: string,
    block_hash: string,
    parent_block_hash: string,
    extrinsics_hash: string,
    state_hash: string,
    contentHash: string,
    total_extrinsic_hash: string,
    timestamp: Date
}


