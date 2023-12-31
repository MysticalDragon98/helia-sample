import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { MemoryDatastore } from "datastore-core";
import { createLibp2p } from "libp2p";
import { tcp } from "@libp2p/tcp";
import { bootstrap } from '@libp2p/bootstrap';
import { identifyService } from 'libp2p/identify';
import { kadDHT } from "@libp2p/kad-dht";
import { PeerId } from '@libp2p/interface/dist/src/peer-id';

interface IOptions {
    peerId: PeerId;
    listenAddresses: string[];
    peerAddresses: string[];
    advertiseAddresses: string[];
    dhtMode: "client" | "server";
}
export default async function createP2PNode (options: IOptions) {
    const datastore = new MemoryDatastore();
    
    const libp2p = await createLibp2p({
        datastore,
        addresses: {
            listen: options.listenAddresses,
            announce: options.advertiseAddresses
        },
        transports: [
            tcp()
        ],
        connectionEncryption: [
            noise()
        ],
        streamMuxers: [
            yamux()
        ],
        peerDiscovery: options.peerAddresses.length > 0? [
            bootstrap({
                list: options.peerAddresses
            })
        ] : [],

        services: {
            identify: identifyService(),
            dht: kadDHT({
                clientMode: options.dhtMode === "client",
            })
        },
        peerId: options.peerId ?? null
    });

    (<any>libp2p).datastore = datastore;
    
    return libp2p;
}
