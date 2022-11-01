import * as fs from 'fs';
// import * as log4js from 'log4js';
import { ConnectionOptions } from 'typeorm';

// import { DecoderConfig } from '@parascan/decoder';

export interface Config {
//   port: number;
//   log: log4js.Configuration;
//   decoder: DecoderConfig;
  orm: ConnectionOptions[];
}

export function loadConfig(path: string): Config {
  return JSON.parse(fs.readFileSync(path).toString()) as Config;
}
