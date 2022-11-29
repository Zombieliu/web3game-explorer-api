import * as path from "path";
import { WsServer, HttpServer } from "tsrpc";
import { serviceProto } from './shared/protocols/serviceProto';
import start_query_block_chain from "./scripts";
// import {AppDataSource} from "./data-source";
import { createConnections, createConnection } from 'typeorm';
import {Block} from "./entity/blocks";
import { Extrinsic } from './entity/extrinsics';
import { Event } from './entity/events';

// 创建 HTTP API 实例，可全局共享
export const apiServer = new HttpServer(serviceProto, {
    port: 3002,
    json: true
});

// Create the Server
export const server = new WsServer(serviceProto, {
    port: 3001,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// Initialize before server start
async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    await apiServer.autoImplementApi(path.resolve(__dirname, 'api'));

};

// Entry function
async function main() {
    await init();
    await server.start();
    await apiServer.start();
    await start_query_block_chain();
}
main();
