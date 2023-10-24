import { $libp2p } from "../p2p/index.js";
import { Helia, createHelia } from "helia";
import { MemoryBlockstore } from 'blockstore-core';
import { customLog, sequencialColor } from "termx";
import { json } from "@helia/json";
import * as HeliaJSON from "@helia/json";

const log = customLog(sequencialColor(), "IPFS");

export let $helia: {
    helia: Helia,
    json: HeliaJSON.JSON
}= {} as any;

export async function initIPFS () {
    const blockstore = new MemoryBlockstore();
    const helia = await createHelia({
        blockstore,
        libp2p: $libp2p,
        datastore: (<any>$libp2p).datastore,
    });

    $helia.helia = helia;
    $helia.json = json(helia);

    log(`IPFS node started!`)
}