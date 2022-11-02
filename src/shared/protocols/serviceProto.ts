import { ServiceProto } from 'tsrpc-proto';
import { ReqGetAll, ResGetAll } from './block/PtlGetAll';
import { ReqGetBy, ResGetBy } from './block/PtlGetBy';
import { ReqGetAll as ReqGetAll_1, ResGetAll as ResGetAll_1 } from './event/PtlGetAll';
import { ReqGetByBlock, ResGetByBlock } from './event/PtlGetByBlock';
import { ReqGetByBlockNumAndIndex, ResGetByBlockNumAndIndex } from './event/PtlGetByBlockNumAndIndex';
import { ReqGetByExt, ResGetByExt } from './event/PtlGetByExt';
import { ReqGetAll as ReqGetAll_2, ResGetAll as ResGetAll_2 } from './extrinsic/PtlGetAll';
import { ReqGetByBlockNumAndIndex as ReqGetByBlockNumAndIndex_1, ResGetByBlockNumAndIndex as ResGetByBlockNumAndIndex_1 } from './extrinsic/PtlGetByBlockNumAndIndex';
import { ReqGetByExtHash, ResGetByExtHash } from './extrinsic/PtlGetByExtHash';
import { MsgChat } from './MsgChat';
import { ReqBlock, ResBlock } from './PtlBlock';
import { ReqEvent, ResEvent } from './PtlEvent';
import { ReqSend, ResSend } from './PtlSend';

export interface ServiceType {
    api: {
        "block/GetAll": {
            req: ReqGetAll,
            res: ResGetAll
        },
        "block/GetBy": {
            req: ReqGetBy,
            res: ResGetBy
        },
        "event/GetAll": {
            req: ReqGetAll_1,
            res: ResGetAll_1
        },
        "event/GetByBlock": {
            req: ReqGetByBlock,
            res: ResGetByBlock
        },
        "event/GetByBlockNumAndIndex": {
            req: ReqGetByBlockNumAndIndex,
            res: ResGetByBlockNumAndIndex
        },
        "event/GetByExt": {
            req: ReqGetByExt,
            res: ResGetByExt
        },
        "extrinsic/GetAll": {
            req: ReqGetAll_2,
            res: ResGetAll_2
        },
        "extrinsic/GetByBlockNumAndIndex": {
            req: ReqGetByBlockNumAndIndex_1,
            res: ResGetByBlockNumAndIndex_1
        },
        "extrinsic/GetByExtHash": {
            req: ReqGetByExtHash,
            res: ResGetByExtHash
        },
        "Block": {
            req: ReqBlock,
            res: ResBlock
        },
        "Event": {
            req: ReqEvent,
            res: ResEvent
        },
        "Send": {
            req: ReqSend,
            res: ResSend
        }
    },
    msg: {
        "Chat": MsgChat
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 12,
    "services": [
        {
            "id": 4,
            "name": "block/GetAll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 13,
            "name": "block/GetBy",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "event/GetAll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 14,
            "name": "event/GetByBlock",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "event/GetByBlockNumAndIndex",
            "type": "api",
            "conf": {}
        },
        {
            "id": 15,
            "name": "event/GetByExt",
            "type": "api",
            "conf": {}
        },
        {
            "id": 9,
            "name": "extrinsic/GetAll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 10,
            "name": "extrinsic/GetByBlockNumAndIndex",
            "type": "api",
            "conf": {}
        },
        {
            "id": 11,
            "name": "extrinsic/GetByExtHash",
            "type": "api",
            "conf": {}
        },
        {
            "id": 0,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 1,
            "name": "Block",
            "type": "api"
        },
        {
            "id": 3,
            "name": "Event",
            "type": "api"
        },
        {
            "id": 2,
            "name": "Send",
            "type": "api"
        }
    ],
    "types": {
        "block/PtlGetAll/ReqGetAll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface"
        },
        "block/PtlGetAll/ResGetAll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "block/PtlGetBy/ReqGetBy": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "numOrHash",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "block/PtlGetBy/ResGetBy": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "event/PtlGetAll/ReqGetAll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "blockNum",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "event/PtlGetAll/ResGetAll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "event/PtlGetByBlock/ReqGetByBlock": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "numOrHash",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Number"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "event/PtlGetByBlock/ResGetByBlock": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "event/PtlGetByBlockNumAndIndex/ReqGetByBlockNumAndIndex": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "blockNum",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "eventIndex",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "event/PtlGetByBlockNumAndIndex/ResGetByBlockNumAndIndex": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "event/PtlGetByExt/ReqGetByExt": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "blockNum",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "extrinsicIndex",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "event/PtlGetByExt/ResGetByExt": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "extrinsic/PtlGetAll/ReqGetAll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "blockNum",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 2,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "extrinsic/PtlGetAll/ResGetAll": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "extrinsic/PtlGetByBlockNumAndIndex/ReqGetByBlockNumAndIndex": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "blockNum",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 1,
                    "name": "extrinsicIndex",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "extrinsic/PtlGetByBlockNumAndIndex/ResGetByBlockNumAndIndex": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "extrinsic/PtlGetByExtHash/ReqGetByExtHash": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "extrinsicHash",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "extrinsic/PtlGetByExtHash/ResGetByExtHash": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "MsgChat/MsgChat": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlBlock/ReqBlock": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "block_num",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlBlock/ResBlock": {
            "type": "Interface",
            "properties": [
                {
                    "id": 8,
                    "name": "block_num",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "block_hash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "parent_block_hash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "extrinsics_hash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "state_hash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "contentHash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "total_extrinsic_hash",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "timestamp",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlEvent/ReqEvent": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlEvent/ResEvent": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "PtlSend/ReqSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlSend/ResSend": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        }
    }
};