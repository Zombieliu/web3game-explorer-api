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
    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "postgres",
        entities: [
            Block, Extrinsic, Event
        ],
        synchronize: true,
        logging: false
    }).then(connection => {
        console.log("Sync Server Connect PostgreSQL Successed!");
        // here you can start to work with your entities
    }).catch(error => console.log(error));
    

    await server.autoImplementApi(path.resolve(__dirname, 'api'));
    await apiServer.autoImplementApi(path.resolve(__dirname, 'api'));

    // TODO
    // Prepare something... (e.g. connect the db)
};

// Entry function
async function main() {
    await init();
    await server.start();
    await apiServer.start();
    await start_query_block_chain();
}
main();
