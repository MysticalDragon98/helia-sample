import { initIPFS } from './lib/ipfs/index.js';
import { ipfsGetJSON } from './lib/ipfs/ipfsGetJSON.js';
import { ipfsStoreJSON } from './lib/ipfs/ipfsStoreJSON.js';
import { initP2P } from './lib/p2p/index.js';
//* Imports

async function main () {
    await Promise.all([
        initP2P()
        //* Main
    ]);

    await initIPFS();
    //* Post Main

    if (process.env.MODE === "server") {
        const cid = await ipfsStoreJSON({
            name: "Camilo"
        });

        console.log({ cid })
    }

    if (process.env.MODE === "client") {
        console.log(await ipfsGetJSON(process.env.CID));
    }
}

main();

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);