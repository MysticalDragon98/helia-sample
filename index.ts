import { initP2P } from './lib/p2p/index.js';
//* Imports

async function main () {
    await Promise.all([
        initP2P()
        //* Main
    ]);
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);