import { ServiceProto } from 'tsrpc-proto';
import { ReqGetBalanceTransfer, ResGetBalanceTransfer } from './account/PtlGetBalanceTransfer';
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
import { ReqSend, ResSend } from './PtlSend';
import { ReqListTokenFungibleTransfer, ResListTokenFungibleTransfer } from './tokenFungible/PtlListTokenFungibleTransfer';
import { ReqListTokenMultiTransfer, ResListTokenMultiTransfer } from './tokenMulti/PtlListTokenMultiTransfer';
import { ReqGetNonFunIdDetail, ResGetNonFunIdDetail } from './tokenNonFungible/PtlGetNonFunIdDetail';
import { ReqListNftTransfer, ResListNftTransfer } from './tokenNonFungible/PtlListNftTransfer';
import { ReqListOwnerNFT, ResListOwnerNFT } from './tokenNonFungible/PtlListOwnerNFT';

export interface ServiceType {
    api: {
        "account/GetBalanceTransfer": {
            req: ReqGetBalanceTransfer,
            res: ResGetBalanceTransfer
        },
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
        "Send": {
            req: ReqSend,
            res: ResSend
        },
        "tokenFungible/ListTokenFungibleTransfer": {
            req: ReqListTokenFungibleTransfer,
            res: ResListTokenFungibleTransfer
        },
        "tokenMulti/ListTokenMultiTransfer": {
            req: ReqListTokenMultiTransfer,
            res: ResListTokenMultiTransfer
        },
        "tokenNonFungible/GetNonFunIdDetail": {
            req: ReqGetNonFunIdDetail,
            res: ResGetNonFunIdDetail
        },
        "tokenNonFungible/ListNftTransfer": {
            req: ReqListNftTransfer,
            res: ResListNftTransfer
        },
        "tokenNonFungible/ListOwnerNFT": {
            req: ReqListOwnerNFT,
            res: ResListOwnerNFT
        }
    },
    msg: {
        "Chat": MsgChat
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 12,
            "name": "account/GetBalanceTransfer",
            "type": "api",
            "conf": {}
        },
        {
            "id": 1,
            "name": "block/GetAll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 2,
            "name": "block/GetBy",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "event/GetAll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "event/GetByBlock",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "event/GetByBlockNumAndIndex",
            "type": "api",
            "conf": {}
        },
        {
            "id": 6,
            "name": "event/GetByExt",
            "type": "api",
            "conf": {}
        },
        {
            "id": 7,
            "name": "extrinsic/GetAll",
            "type": "api",
            "conf": {}
        },
        {
            "id": 8,
            "name": "extrinsic/GetByBlockNumAndIndex",
            "type": "api",
            "conf": {}
        },
        {
            "id": 9,
            "name": "extrinsic/GetByExtHash",
            "type": "api",
            "conf": {}
        },
        {
            "id": 10,
            "name": "Chat",
            "type": "msg"
        },
        {
            "id": 11,
            "name": "Send",
            "type": "api"
        },
        {
            "id": 16,
            "name": "tokenFungible/ListTokenFungibleTransfer",
            "type": "api",
            "conf": {}
        },
        {
            "id": 17,
            "name": "tokenMulti/ListTokenMultiTransfer",
            "type": "api",
            "conf": {}
        },
        {
            "id": 14,
            "name": "tokenNonFungible/GetNonFunIdDetail",
            "type": "api",
            "conf": {}
        },
        {
            "id": 15,
            "name": "tokenNonFungible/ListNftTransfer",
            "type": "api",
            "conf": {}
        },
        {
            "id": 13,
            "name": "tokenNonFungible/ListOwnerNFT",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "account/PtlGetBalanceTransfer/ReqGetBalanceTransfer": {
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
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "eventIndex",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "fromAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "toAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 3,
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
        "account/PtlGetBalanceTransfer/ResGetBalanceTransfer": {
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
                    },
                    "optional": true
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
                    },
                    "optional": true
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
                    "name": "signer",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 3,
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
        },
        "tokenFungible/PtlListTokenFungibleTransfer/ReqListTokenFungibleTransfer": {
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
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "eventIndex",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "fromAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "toAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "fungibleTokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "tokenFungible/PtlListTokenFungibleTransfer/ResListTokenFungibleTransfer": {
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
        "tokenMulti/PtlListTokenMultiTransfer/ReqListTokenMultiTransfer": {
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
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "eventIndex",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "fromAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "toAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "multiTokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "tokenMulti/PtlListTokenMultiTransfer/ResListTokenMultiTransfer": {
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
        "tokenNonFungible/PtlGetNonFunIdDetail/ReqGetNonFunIdDetail": {
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
                    "name": "who",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "nonFungibleTokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "tokenNonFungible/PtlGetNonFunIdDetail/ResGetNonFunIdDetail": {
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
        "tokenNonFungible/PtlListNftTransfer/ReqListNftTransfer": {
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
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "eventIndex",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "fromAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "toAccount",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "nonFungibleTokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "tokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 6,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 7,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "tokenNonFungible/PtlListNftTransfer/ResListNftTransfer": {
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
        "tokenNonFungible/PtlListOwnerNFT/ReqListOwnerNFT": {
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
                    "name": "owner",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "nonFungibleTokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "tokenId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "pageIndex",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "limit",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "tokenNonFungible/PtlListOwnerNFT/ResListOwnerNFT": {
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
        }
    }
};