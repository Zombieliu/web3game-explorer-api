import { ApiCall } from "tsrpc";
import { server } from "..";
import { ReqSend, ResSend } from "../shared/protocols/PtlSend";
import {Block} from "../entity/blocks";
// This is a demo code file
// Feel free to delete it
import { getCustomRepository, getRepository } from "typeorm";

export default async function (call: ApiCall<ReqSend, ResSend>) {
    // Error
    if (call.req.content.length === 0) {
        await call.error('Content is empty')
        return;
    }

    // Success
    let time = new Date();
    call.succ({
        time: time
    });

    const blocks = await getRepository(Block)
        .createQueryBuilder('block')
        .orderBy('id', 'DESC')
        .take(10)
        .getMany();
    console.log(typeof blocks);
    await server.broadcastMsg('Chat', {
        content: JSON.stringify(blocks),
        time: new Date()
    })
}
